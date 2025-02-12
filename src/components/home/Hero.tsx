"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Heading,
  Text,
  Box,
  useColorMode,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const backgroundHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "100%"]
  );

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.7, 1],
    [1, 0.8, 0.0, 0]
  );

  const buttonY = useTransform(scrollYProgress, [0, 0.5], ["60%", "90%"]);

  const buttonTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 0.65],
    [1, 1, 0.3, 0]
  );

  const buttonTextDisplay = useTransform(
    scrollYProgress,
    [0, 0.66],
    ["inline-block", "none"]
  );

  const buttonWidth = useTransform(
    scrollYProgress,
    [0, 0.6, 0.8],
    ["1000px", "160px", "126px"]
  );

  const textWidth = useTransform(
    scrollYProgress,
    [0, 0.5, 0.65, 0.7],
    ["auto", "auto", "200px", "0px"]
  );

  return (
    <Box
      ref={heroRef}
      width="100%"
      height="150dvh"
      overflow="hidden"
      position="relative"
    >
      <Box
        position="fixed"
        overflow="hidden"
        top={0}
        left={0}
        width="100%"
        height="100dvh"
      >
        {/* 背景動畫區塊 - 控制背景顏色和高度變化 */}
        <motion.div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: backgroundHeight,
            transformOrigin: "bottom",
            background: colorMode === "light" ? "#171407" : "#faf9f0",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          {/* 內容區塊 - 控制整體內容的位置和縮放 */}
          <motion.div
            style={{
              position: "fixed",
              top: "35%",
              left: "0%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              textAlign: "center",
              scale: titleScale,
              opacity: titleOpacity,
              pointerEvents: "auto",
            }}
          >
            {/* 上半部動畫 - 標題、副標和按鈕的淡入和位移效果 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: "relative",
              }}
            >
              <Text
                fontSize="xl"
                style={{
                  position: "relative",
                  letterSpacing: "2px",
                }}
              >
                Manage Money, Empower Life
              </Text>
              <Heading
                as="h1"
                mb="20"
                fontSize={{
                  base: "4xl",
                  sm: "5xl",
                  md: "6xl",
                  lg: "7xl",
                  xl: "8xl",
                }}
                style={{
                  position: "relative",
                  letterSpacing: "2px",
                }}
              >
                MoneyMind
              </Heading>
            </motion.div>

            {/* 下半部動畫 - Scroll 提示的淡入和位移效果 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                width="full"
                bg="transparent"
                _hover={{
                  bg:
                    colorMode === "light"
                      ? "rgba(23, 20, 7, 0.1)"
                      : "rgba(250, 249, 240, 0.1)",
                }}
              >
                <Text
                  fontSize={{ base: "xs", sm: "sm" }}
                  style={{
                    letterSpacing: "0.5px",
                  }}
                  color={colorMode === "light" ? "#1a1912" : "#eeede5"}
                >
                  Scroll
                </Text>
                <ChevronDown
                  size={24}
                  color={colorMode === "light" ? "#1a1912" : "#eeede5"}
                  strokeWidth={0.5}
                />
              </Flex>
            </motion.div>
          </motion.div>
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.5,
          delay: 0.8,
          ease: "easeOut",
        }}
        style={{
          position: "fixed",
          top: buttonY,
          width: "100%",
          textAlign: "center",
          zIndex: 99,
          pointerEvents: "auto",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={{
            width: buttonWidth,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => router.push("/auth/login")}
            style={{
              pointerEvents: "auto",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="#7389d4"
            color="white"
            width="100%"
            px="48px"
            py="16px"
            fontSize="xl"
            fontWeight="light"
            borderRadius="full"
            gap={3}
            _hover={{
              bg: "gray.800",
            }}
            _active={{
              bg: "gray.900",
              transform: "translateY(0)",
            }}
          >
            <Image src="/SVG/button.svg" alt="Money" width={32} height={32} />
            <motion.span
              style={{
                opacity: buttonTextOpacity,
                display: buttonTextDisplay,
                width: textWidth,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              Begin Your Money Journey
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Hero;
