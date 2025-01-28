"use client";

import { motion, useInView } from "framer-motion";
import { Heading, Text, Box } from "@chakra-ui/react";
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <Box
      ref={heroRef}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      textAlign="center"
      position="relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Heading as="h1" size="4xl" mb={4} className="HomeHero-title">
          MoneyMind
        </Heading>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <Text fontSize="xl" className="HomeHero-text">
          Manage Money, Empower Life
        </Text>
      </motion.div>
    </Box>
  );
};

export default Hero;
