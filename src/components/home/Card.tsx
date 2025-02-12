"use client";

import { motion, useInView } from "framer-motion";
import {
  Container,
  Heading,
  Text,
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useCard } from "@/hook/useCard";
import RiveWrapper from "./RiveWrapper";

interface CardItemProps {
  card: Record<string, any>;
  padding: number;
  margin: number;
  gap: number;
  flexDirection: "row" | "column";
  textWidth: string;
  imageWidth: string;
}

const CardList = () => {
  const { cards } = useCard();

  const flexDirection = useBreakpointValue({
    base: "column" as const,
    md: "row" as const,
  });
  const textWidth = useBreakpointValue({ base: "100%", md: "60%" });
  const imageWidth = useBreakpointValue({ base: "100%", md: "40%" });
  const padding = useBreakpointValue({ base: 8, md: 12 });
  const margin = useBreakpointValue({ base: 8, md: 12 });
  const gap = useBreakpointValue({ base: 4, md: 8 });

  return (
    <Container maxW={{ base: "100%", md: "container.md", lg: "6xl" }}>
      {cards.map((card, index) => (
        <CardItem
          key={index}
          card={card}
          padding={padding as number}
          margin={margin as number}
          gap={gap as number}
          flexDirection={flexDirection as "row" | "column"}
          textWidth={textWidth as string}
          imageWidth={imageWidth as string}
        />
      ))}
    </Container>
  );
};

const CardItem = ({
  card,
  padding,
  margin,
  gap,
  flexDirection,
  textWidth,
  imageWidth,
}: CardItemProps) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-20% 0px" });
  const { colorMode } = useColorMode();

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Card
        mb={margin}
        boxShadow="lg"
        bg={colorMode === "light" ? "#1a1912" : "#eeede5"}
      >
        <Flex
          p={padding}
          gap={gap}
          flexDirection={flexDirection}
          alignItems="center"
        >
          <Box w={textWidth}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardHeader p={0}>
                <Heading
                  as="h3"
                  size={{ base: "xl", md: "2xl" }}
                  color={colorMode === "light" ? "#faf9f0" : "#171407"}
                  mb={4}
                >
                  {card.title}
                </Heading>
              </CardHeader>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CardBody>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color={colorMode === "light" ? "#faf9f0" : "#171407"}
                >
                  {card.description}
                </Text>
              </CardBody>
            </motion.div>
          </Box>

          <Box w={imageWidth} h="100%">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                width: "100%",
                height: "400px",
              }}
            >
              <RiveWrapper src={card.src} />
            </motion.div>
          </Box>
        </Flex>
      </Card>
    </motion.div>
  );
};

export default CardList;
