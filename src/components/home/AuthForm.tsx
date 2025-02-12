"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Flex,
  useBreakpointValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import RiveWrapper from "./RiveWrapper";
import { useRouter } from "next/navigation";
import { useAuthForm } from "@/hook/useAuthForm";

interface AuthFormProps {
  value: string;
}

export default function AuthForm({ value }: AuthFormProps) {
  const {
    isLogin,
    setIsLogin,
    formValues,
    handleInputChange,
    state,
    dispatch,
    resetForm,
  } = useAuthForm();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.success === "signup successful") {
      resetForm();

      const timer = setTimeout(() => {
        router.push("/accounting");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.success, router, resetForm]);

  return (
    <Flex w="100dvw" h="100dvh" direction={{ base: "column", md: "row" }}>
      {/* Left animation area */}
      {!isMobile && (
        <Box flex={1}>
          <RiveWrapper src={"/animations/isocube.riv"} />
        </Box>
      )}

      {/* Right form area */}
      <Flex flex={1} justify="center" align="center" bg="white">
        <VStack spacing={8} w="full" maxW="md" px={8}>
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            textAlign="center"
            mt={6}
          >
            {value === "login" && isLogin ? "Welcome Back" : "Create Account"}
          </Heading>

          <form ref={formRef} action={dispatch}>
            <VStack spacing={6} w="full" align="stretch">
              <FormControl isRequired isInvalid={Boolean(state?.error?.email)}>
                <FormLabel mb={2}>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  size="lg"
                  variant="outline"
                  borderColor="gray.200"
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                  bg="white"
                  borderRadius="md"
                  h="50px"
                />
                <FormErrorMessage>{state?.error?.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={Boolean(state?.error?.password)}
              >
                <FormLabel mb={2}>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  size="lg"
                  variant="outline"
                  borderColor="gray.200"
                  _hover={{ borderColor: "gray.300" }}
                  _focus={{ borderColor: "blue.500", boxShadow: "none" }}
                  bg="white"
                  borderRadius="md"
                  h="50px"
                  mb={2}
                />
                <FormErrorMessage>{state.error?.password}</FormErrorMessage>
              </FormControl>
            </VStack>
            {state.success && (
              <Text
                mb={2}
                color={
                  state.success.includes("successful") ? "green.500" : "red.500"
                }
              >
                {state.success}
              </Text>
            )}
            <Button
              type="submit"
              size="lg"
              bg="blue.500"
              color="white"
              _hover={{
                bg: "blue.600",
              }}
              fontSize="md"
              h="50px"
              borderRadius="md"
              w="full"
            >
              {value === "login" && isLogin ? "Login" : "Register"}
            </Button>
          </form>

          <Flex justify="center" align="center" gap={1}>
            <Text color="gray.600">
              {value === "login" && isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </Text>
            <Button
              type="submit"
              isLoading={pending}
              loadingText="Submitting..."
              variant="link"
              color="blue.500"
              fontWeight="medium"
              onClick={() => {
                if (value === "login" && isLogin) {
                  router.push("/auth/register");
                } else {
                  router.push("/auth/login");
                }
              }}
            >
              {value === "login" && isLogin ? "Register" : "Login"}
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
}
