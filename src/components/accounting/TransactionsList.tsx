"use client";

import React, { useMemo } from "react";
import { DeleteIcon } from "lucide-react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import { useExpense } from "@/store/provider/ExpenseProvider";
import type { TransactionFields } from "@/types/FormType";
import { useTransactionManager } from "@/hook/useTransactionManager";

interface TransactionListItemProps {
  transaction: TransactionFields;
  onDelete: (id: string) => void;
}

const TransactionsList: React.FC = () => {
  const { state, dispatch } = useExpense();
  const { deleteTransaction } = useTransactionManager();
  const { expenses } = state;
  const toast = useToast();

  const handleDelete = async (id: string) => {
    try {
      if (
        !window.confirm("Are you sure you want to delete this transaction?")
      ) {
        return;
      }
      dispatch({ type: "DELETE_EXPENSE", id });
      await deleteTransaction(id);
      toast({
        title: "Form submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Form submitted failed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const allTransactions = useMemo(() => {
    return Array.isArray(expenses) &&
      expenses.length > 0 &&
      expenses[0]?.transactions?.length > 0
      ? expenses[0].transactions.map((transaction: any) => transaction || [])
      : [];
  }, [expenses]);

  return (
    <TableContainer w="full">
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              <Th>Category</Th>
              <Th>Payment Method</Th>
              <Th>Description</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {allTransactions.map((transaction: TransactionFields) => (
              <TransactionListItem
                key={transaction.id}
                transaction={transaction}
                onDelete={handleDelete}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
};

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
  onDelete,
}) => {
  return (
    <Tr>
      <Td>{transaction.type}</Td>
      <Td color={transaction.type === "expense" ? "red.500" : "green.500"}>
        {new Intl.NumberFormat("zh-TW", {
          style: "currency",
          currency: "TWD",
        }).format(parseFloat(transaction.amount))}
      </Td>
      <Td>
        {new Date(transaction.date).toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </Td>
      <Td>{transaction.category}</Td>
      <Td>{transaction.paymentMethod}</Td>
      <Td>{transaction.description}</Td>
      <Td isNumeric>
        <IconButton
          aria-label="Delete transaction"
          icon={<DeleteIcon />}
          size="sm"
          colorScheme="red"
          variant="ghost"
          onClick={() => onDelete(transaction.id as string)}
        />
      </Td>
    </Tr>
  );
};

export default TransactionsList;
