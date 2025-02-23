"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="flex items-center justify-center pt-12 lg:pt-24">
      <Link href="/" className="flex gap-4 -ml-12">
        <motion.div
          initial={{ opacity: 0, y: 30, x: 30 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 2 }}
        >
          <Image
            src="/dove.gif"
            alt="The Museum of Her"
            priority
            width={64}
            height={64}
            className="contrast-125"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.75 }}
          className="text-sm uppercase pb-2 border-b border-white flex flex-col items-start font-light font-serif tracking-wide text-black"
        >
          <span>The</span>
          <span>Museum</span>{" "}
          <span>
            <span className="lowercase italic">of</span> Her
          </span>
        </motion.h1>
      </Link>
    </header>
  );
}
