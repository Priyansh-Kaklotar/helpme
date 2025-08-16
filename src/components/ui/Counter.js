"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function Counter({ from, to, duration = 2, delay = 0 }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration: duration,
      delay: delay,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count, to, duration, delay]);

  return <motion.span>{rounded}</motion.span>;
}