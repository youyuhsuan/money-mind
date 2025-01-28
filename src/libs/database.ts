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
  serverTimestamp,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firebaseDB } from "@/config/firebaseConfig";
import { SessionData } from "@/types/SessionType";
import { StoredTransactionData } from "@/types/FormType";

const sessionDB = {
  async insertSession(sessionData: SessionData): Promise<boolean> {
    try {
      const insertSessionData = await addDoc(
        collection(firebaseDB, "sessions"),
        sessionData
      );
      const docSnap = await getDoc(insertSessionData);
      if (!docSnap) {
        console.error(`insertSession error adding document:`, sessionData);
        return false;
      }
      console.log(`sessionDB insertSession success: ${insertSessionData.id}`);
      return true;
    } catch (e) {
      console.error(`insertSession error adding document:`, e);
      return false;
    }
  },
  async findSession(sessionId: string) {
    try {
      const q = query(
        collection(firebaseDB, "sessions"),
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
  async deleteSession(sessionId: string) {
    try {
      const q = query(
        collection(firebaseDB, "sessions"),
        where("sessionId", "==", sessionId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching session found");
        return null;
      }

      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);

      return querySnapshot.docs[0].data();
    } catch (e) {
      console.error(`deleteSession error:`, e);
      throw e;
    }
  },
};

const accountDB = {
  async createAccountTransaction(storedTransactionData: StoredTransactionData) {
    try {
      const { userId, ...transaction } = storedTransactionData;
      if (!userId) {
        throw new Error("userId is required for creating a transaction");
      }

      const accountRef = doc(firebaseDB, "accounts", userId);
      const accountDoc = await getDoc(accountRef);

      if (!accountDoc.exists()) {
        await setDoc(accountRef, {
          userId,
          transactions: [transaction],
        });
      } else {
        await updateDoc(accountRef, {
          transactions: arrayUnion(transaction),
        });
      }
      return {
        accountId: accountRef.id,
      };
    } catch (error) {
      console.error("Create Account Transaction error:", error);
      throw error;
    }
  },
  async getTransactions(userId: string) {
    try {
      const accountDoc = await accountDB.findAccount(userId);
      if (!accountDoc) {
        throw new Error("No accounts found for this user");
      }
      const data = accountDoc.data();
      return data.transactions;
    } catch (error) {
      console.error(`Error fetching user transactions:`, error);
      throw error;
    }
  },
  async findAccount(userId: string) {
    try {
      if (!userId) {
        throw new Error("userId is required");
      }

      const accountRef = doc(firebaseDB, "accounts", userId);
      const accountDoc = await getDoc(accountRef);

      if (!accountDoc.exists()) {
        console.log("Account not found");
        return null;
      }

      return accountDoc;
    } catch (error) {
      console.error(`Error finding account for user ${userId}:`, error);
      throw error;
    }
  },
  async deleteTransaction(
    userId: string,
    transactionId: string
  ): Promise<void> {
    try {
      // Validate input parameters
      if (!userId || !transactionId) {
        throw new Error(
          "Both userId and transactionId are required parameters"
        );
      }

      // Check if user account exists
      const accountDoc = await this.findAccount(userId);
      if (!accountDoc) {
        throw new Error("User account not found");
      }

      // Get current transactions array
      const currentTransactions = accountDoc.data().transactions || [];

      // Find the transaction index
      const transactionIndex = currentTransactions.findIndex(
        (transaction: any) => transaction.id === transactionId
      );

      // Verify transaction exists
      if (transactionIndex === -1) {
        throw new Error("Transaction record not found");
      }

      // Create updated transactions array
      const updatedTransactions = currentTransactions.filter(
        (transaction: any) => transaction.id !== transactionId
      );

      // Update document with new transactions array
      const accountRef = doc(firebaseDB, "accounts", userId);
      await updateDoc(accountRef, {
        transactions: updatedTransactions,
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }
  },
};

export { sessionDB, accountDB };
