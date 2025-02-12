"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  VStack,
  Container,
  Text,
  Box,
  RadioGroup,
  HStack,
  Radio,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useTransactionManager } from "@/hook/useTransactionManager";
import { useTransactionForm } from "@/hook/useTransactionForm";
import TypeSegmentedControl from "./TypeSegmentedControl";
import { ChipInput } from "./ChipInput";

const AccountForm: React.FC = () => {
  const { colorMode } = useColorMode();
  const { refreshTransactions } = useTransactionManager();
  const { state, dispatch, formRef, category, setCategory, type, setType } =
    useTransactionForm({
      onSuccess: refreshTransactions,
    });

  return (
    <Container maxW="container.md" py={6}>
      <form ref={formRef} action={dispatch}>
        <VStack spacing={4} align="stretch">
          {/* Type */}
          <TypeSegmentedControl
            id="type"
            name="type"
            value={type}
            errors={
              typeof state?.errors === "string"
                ? state.errors
                : state?.errors?.type
            }
            onChange={setType}
          />

          {/* Amount */}
          <FormControl isRequired>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <Box position="relative">
              <Input
                id="amount"
                type="number"
                name="amount"
                placeholder="0"
                min={0}
                step="0"
                pl="30px"
                fontSize="xl"
                height="40px"
              />
              <Text
                position="absolute"
                left="12px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="xl"
                color="gray.600"
              >
                $
              </Text>
            </Box>
            {state?.errors &&
              typeof state.errors === "object" &&
              "amount" in state.errors && (
                <FormErrorMessage>{state.errors.amount}</FormErrorMessage>
              )}
          </FormControl>

          {/* Date */}
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            {state?.errors &&
              typeof state.errors === "object" &&
              "date" in state.errors && (
                <FormErrorMessage>{state.errors.date}</FormErrorMessage>
              )}
          </FormControl>

          {/* Category */}
          <ChipInput
            errors={
              typeof state?.errors === "string"
                ? state.errors
                : state?.errors?.category
            }
            value={category}
            onChange={setCategory}
          />

          {/* Payment Method */}
          <FormControl isRequired>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup name="paymentMethod" defaultValue="cash">
              <HStack spacing={4}>
                <Radio value="cash">Cash</Radio>
                <Radio value="credit">Credit Card</Radio>
              </HStack>
            </RadioGroup>
            {state?.errors &&
              typeof state.errors === "object" &&
              "paymentMethod" in state.errors && (
                <FormErrorMessage>
                  {state.errors.paymentMethod}
                </FormErrorMessage>
              )}
          </FormControl>

          {/* Description */}
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Please enter the description..."
              resize="vertical"
              minH="100px"
              maxH="200px"
              rows={4}
              spellCheck="true"
              bg={colorMode === "light" ? "#faf9f0" : "#171407"}
              _hover={{ borderColor: "gray.300" }}
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            />
            {state?.errors &&
              typeof state.errors === "object" &&
              "description" in state.errors && (
                <FormErrorMessage>{state.errors.description}</FormErrorMessage>
              )}
          </FormControl>

          <AccountButton />
        </VStack>
      </form>
    </Container>
  );
};

function AccountButton() {
  const { pending } = useFormStatus();
  const { colorMode } = useColorMode();

  return (
    <Button
      type="submit"
      isLoading={pending}
      loadingText="Submitting..."
      color="white"
      bg={colorMode === "light" ? "brand.accent.light" : "brand.accent.dark"}
      _hover={{
        opacity: 0.9,
        boxShadow: "md",
      }}
      width="100%"
      size="lg"
      mt={2}
    >
      Submit
    </Button>
  );
}

export default AccountForm;
