"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  Stack,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { Github, Twitter, Linkedin } from "lucide-react";

interface MenuLink {
  label: string;
  href: string;
}

const footerLinks: Record<string, MenuLink[]> = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Expense Tracking", href: "/services/tracking" },
    { label: "Budgeting", href: "/services/budgeting" },
    { label: "Financial Planning", href: "/services/planning" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const Footer = () => {
  const { colorMode } = useColorMode();

  const SocialIcons = () => (
    <Stack direction="row" spacing={4}>
      <Link href="https://github.com" isExternal>
        <Github
          size={20}
          color={colorMode === "light" ? "#171407" : "#faf9f0"}
          strokeWidth={1.5}
        />
      </Link>
      <Link href="https://linkedin.com" isExternal>
        <Linkedin
          size={20}
          color={colorMode === "light" ? "#171407" : "#faf9f0"}
          strokeWidth={1.5}
        />
      </Link>
    </Stack>
  );

  return (
    <Box
      position="relative"
      as="footer"
      py={{ base: 8, md: 12 }}
      bg={colorMode === "light" ? "#faf9f0" : "#171407"}
      zIndex={2}
    >
      <Container maxW="container.xl">
        <Stack spacing={8}>
          {/* Main footer content */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            gap={8}
          >
            {/* Brand section */}
            <Stack spacing={4} flex={1}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={
                  colorMode === "light" ? "brand.text.light" : "brand.text.dark"
                }
              >
                MoneyMind
              </Text>
              <Text
                color={colorMode === "light" ? "gray.600" : "gray.300"}
                maxW="300px"
              >
                Empowering your financial journey with smart money management
                tools.
              </Text>
              <SocialIcons />
            </Stack>

            {/* Links sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <Stack key={title} spacing={4} flex={1}>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color={
                    colorMode === "light"
                      ? "brand.text.light"
                      : "brand.text.dark"
                  }
                >
                  {title}
                </Text>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    fontSize="sm"
                    color={colorMode === "light" ? "gray.600" : "gray.300"}
                    _hover={{
                      color:
                        colorMode === "light"
                          ? "brand.text.light"
                          : "brand.text.dark",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            ))}
          </Flex>

          {/* Copyright section */}
          <Box
            pt={8}
            borderTopWidth={1}
            borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
          >
            <Text
              fontSize="sm"
              color={colorMode === "light" ? "gray.600" : "gray.300"}
              textAlign="center"
            >
              © {new Date().getFullYear()} MoneyMind. All rights reserved.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
