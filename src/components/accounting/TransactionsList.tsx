"use client";

import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
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
  Flex,
} from "@chakra-ui/react";
import type { TransactionFields } from "@/types/FormType";
import CategoryTag from "@/components/accounting/CategoryTag";

interface TransactionListItemProps {
  transaction: TransactionFields;
  onDelete: (id: string) => void;
}

interface TransactionsListProps {
  displayTransactions: TransactionFields[];
  tableRef: React.RefObject<HTMLDivElement>;
  sortConfig: {
    key: keyof TransactionFields | null;
    direction: "asc" | "desc" | null;
  };
  handleSort: (e: React.MouseEvent, key: keyof TransactionFields) => void;
  handleDelete: (id: string) => void;
}

const TransactionsList = ({
  displayTransactions,
  tableRef,
  sortConfig,
  handleSort,
  handleDelete,
}: TransactionsListProps) => {
  return (
    <TableContainer w="full">
      <Box overflowX="auto" ref={tableRef}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th onClick={(e) => handleSort(e, "type")} cursor="pointer">
                <Flex align="center" gap={2}>
                  Type
                  {sortConfig.key === "type" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : null}
                </Flex>
              </Th>
              <Th onClick={(e) => handleSort(e, "amount")} cursor="pointer">
                <Flex align="center" gap={2}>
                  Amount
                  {sortConfig.key === "amount" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : null}
                </Flex>
              </Th>
              <Th onClick={(e) => handleSort(e, "date")} cursor="pointer">
                <Flex align="center" gap={2}>
                  Date
                  {sortConfig.key === "date" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )
                  ) : null}
                </Flex>
              </Th>
              <Th>Category</Th>
              <Th>Payment Method</Th>
              <Th>Description</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayTransactions.map((transaction: TransactionFields) => (
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
      <Td
        color={
          transaction.type === "expense"
            ? "brand.accent.light"
            : "brand.secondary.light"
        }
      >
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
      <Td>
        <Box display="flex" gap={2}>
          {Array.isArray(transaction.category) ? (
            transaction.category.map((cat) => (
              <CategoryTag key={cat} category={cat} />
            ))
          ) : (
            <CategoryTag category={String(transaction.category)} />
          )}
        </Box>
      </Td>
      <Td>{transaction.paymentMethod}</Td>
      <Td>{transaction.description}</Td>
      <Td isNumeric>
        <IconButton
          aria-label="Delete transaction"
          icon={<Trash2 />}
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
