"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// The first page load renders straight away (no hidden content before JS runs);
// only later client-side navigations animate.
let hasMounted = false;

/**
 * Page transition: each route fades in with a short upward settle.
 * A template (unlike a layout) remounts on every navigation, which replays it.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasMounted && !reduce;
  useEffect(() => {
    hasMounted = true;
  }, []);
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
