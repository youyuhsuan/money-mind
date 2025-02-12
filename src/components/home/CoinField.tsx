"use client";

import { motion, useScroll, useTime, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface CoinProps {
  x: string;
  y: string;
  delay: number;
}

const Coin = ({ x, y, delay = 0 }: CoinProps) => {
  const time = useTime();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  const xPath = useTransform(
    scrollYProgress,
    [
      0,
      0.03,
      0.06,
      0.09, // Initial movement (1-4)
      0.12,
      0.15, // First drop (5-6)
      0.18,
      0.21,
      0.24, // First bounce (7-9)
      0.27,
      0.3,
      0.33,
      0.36,
      0.39, // Second bounce sequence (10-14)
      0.42, // Mid-point fall (15)
      0.45,
      0.48,
      0.51, // Third bounce start (16-18)
      0.54,
      0.57,
      0.6,
      0.63, // Third bounce peak (19-22)
      0.66,
      0.69,
      0.72, // Fourth bounce start (23-25)
      0.75,
      0.78,
      0.81,
      0.84,
      0.87,
      0.9, // Final settling (26-32)
    ],
    [
      "45.6%",
      "45.6%",
      "45.6%",
      "45.6%", // Slight horizontal drift
      "45.6%",
      "45.6%", // Starting point
      "46.2%",
      "46.8%",
      "47.4%",
      "48.0%",
      "48.6%",
      "49.2%",
      "49.8%",
      "50.4%",
      "51.0%",
      "51.6%",
      "52.2%",
      "52.8%",
      "53.4%",
      "54.0%",
      "54.6%",
      "55.3%",
      "55.5%",
      "55.6%",
      "55.6%",
      "55.6%",
      "55.6%",
      "55.6%",
      "55.6%",
      "55.6%",
      "55.6%",
    ]
  );

  const yPath = useTransform(
    scrollYProgress,
    [
      0,
      0.03,
      0.06,
      0.09, // Initial drop
      0.12,
      0.15, // First impact
      0.18,
      0.21,
      0.24, // First bounce
      0.27,
      0.3,
      0.33,
      0.36,
      0.39,
      0.42,
      0.45,
      0.48,
      0.51,
      0.54,
      0.57,
      0.6,
      0.63,
      0.66,
      0.69,
      0.72,
      0.75,
      0.78,
      0.81,
      0.84,
      0.87,
      0.9,
    ],
    [
      "0%",
      "10%",
      "20%",
      "30%", // Initial drop (reduced height)
      "50%",
      "66%", // First impact (lower)
      "62%",
      "50%",
      "41%",
      "40%", // First bounce (smaller height)
      "41%",
      "44%",
      "48%",
      "50%", // Second sequence (more controlled)
      "58%", // Mid-point
      "50%",
      "42%",
      "40%", // Third sequence
      "42%",
      "43%",
      "45%",
      "46%",
      "46%",
      "46%",
      "46%",
      "46%",
      "46%",
      "46%",
      "46%",
      "46%",
      "46%", // Final settling (maintains position)
    ]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: xPath,
        top: yPath,
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        rotate: rotate,
      }}
      animate={{
        transition: {
          duration: 2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      }}
    >
      <Image src="/SVG/money.svg" alt="Money" width={40} height={40} />
    </motion.div>
  );
};

const CoinField = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [2, 5]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        scale: scale,
        zIndex: 10,
      }}
    >
      <Coin x="50%" y="50%" delay={0} />
    </motion.div>
  );
};

export default CoinField;
