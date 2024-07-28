import { firebase_db } from "@/app/libs/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  Timestamp,
  getDocs,
  runTransaction,
  DocumentReference,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

interface SessionData {
  sessionId: string;
  userId: string;
  userEmail: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
}

interface AccountData {
  userId: string;
  transaction: TransactionData;
}

interface TransactionData {
  id?: string;
  type: "income" | "expense";
  accountId: string;
  amount: number;
  description: string;
  createdAt: Timestamp;
}

interface AccountTransactionData {
  accountId: string;
  transactionId: string;
}

const sessionDB = {
  async insertSession(sessionData: SessionData): Promise<void> {
    console.info(sessionData);
    try {
      const insertSessionData = await addDoc(
        collection(firebase_db, "sessions"),
        sessionData
      );
      console.log(`sessionDB insertSession success: ${insertSessionData.id}`);
    } catch (e) {
      console.error(`insertSession error adding document:`, e);
    }
  },
  async findSession(sessionId: string) {
    try {
      const q = query(
        collection(firebase_db, "sessions"),
        where("sessionId", "==", sessionId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No matching session found");
        return null;
      }
      return querySnapshot.docs[0].data();
    } catch (e) {
      console.error(`findSession error creating query:`, e);
      return null;
    }
  },
};

const accountDB = {
  async createAccountTransaction(
    userId: string,
    accountData: Omit<AccountData, "id">,
    transactionData: Omit<TransactionData, "id" | "accountId">
  ): Promise<AccountTransactionData> {
    try {
      return await runTransaction(firebase_db, async (transaction) => {
        const accountSnapshot = await accountDB.findAccount(userId);
        let accountRef: DocumentReference;
        let accountId: string;
        if (!accountSnapshot || accountSnapshot.empty) {
          const newAccountRef = await addDoc(
            collection(firebase_db, "accounts"),
            {
              ...accountData,
              userId: userId,
            }
          );
          accountRef = newAccountRef;
          accountId = newAccountRef.id;
        } else {
          accountRef = accountSnapshot.docs[0].ref;
          accountId = accountSnapshot.docs[0].id;
          await transaction.update(accountRef, accountData);
        }
        const transactionRef = await addDoc(
          collection(accountRef, "transactions"),
          {
            ...transactionData,
            accountId: accountId,
            createdAt: Timestamp.now(),
          }
        );
        return {
          accountId: accountId,
          transactionId: transactionRef.id,
        };
      });
    } catch (error) {
      console.error(
        "Error creating or updating account with transaction:",
        error
      );
      throw error;
    }
  },
  async getTransactions(userId: string): Promise<TransactionData[]> {
    try {
      const transactions: TransactionData[] = [];
      const accountSnapshot = await accountDB.findAccount(userId);
      if (!accountSnapshot) {
        console.log("No accounts found for this user");
        return transactions;
      } else {
        const accountDoc = accountSnapshot.docs[0];
        const accountId = accountDoc.id;
        const transactionsCollectionRef = collection(
          firebase_db,
          `accounts/${accountId}/transactions`
        );
        const transactionsSnapshot = await getDocs(transactionsCollectionRef);

        transactionsSnapshot.forEach((transactionDoc) => {
          const transactionData = transactionDoc.data();
          transactions.push({
            id: transactionDoc.id,
            accountId: accountId,
            description: transactionData.description,
            amount: transactionData.amount,
            type: transactionData.type,
            createdAt: transactionData.createdAt,
          });
        });
      }
      return transactions;
    } catch (error) {
      console.error(`Error fetching user transactions:`, error);
      throw error;
    }
  },
  async findAccount(userId: string) {
    try {
      const q = query(
        collection(firebase_db, "accounts"),
        where("userId", "==", userId)
      );
      const accountsSnapshot = await getDocs(q);
      return accountsSnapshot;
    } catch (error) {
      console.error(`Error fetching user transactions: ${error}`);
    }
  },
  async deleteTransaction(
    userId: string,
    transactionId: string
  ): Promise<void> {
    try {
      const accountSnapshot = await accountDB.findAccount(userId);
      if (!accountSnapshot || accountSnapshot.empty) {
        console.log("No accounts found for this user");
        return;
      }
      const accountRef = accountSnapshot.docs[0].ref;
      const transactionDocRef = doc(accountRef, "transactions", transactionId);
      const transactionDoc = await getDoc(transactionDocRef);
      if (!transactionDoc.exists()) {
        console.log("Transaction not found");
        return;
      }
      await deleteDoc(transactionDocRef);
    } catch (error) {
      console.error(`Error fetching user transactions:`, error);
      throw error;
    }
  },
};

export { sessionDB, accountDB };
export type { SessionData, AccountData, TransactionData };
