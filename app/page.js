"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import categories from "@/components/categories";
import { supabase } from "@/app/lib/supabaseClient";
import { Masonry } from "react-plock";
import ShareButton from "@/components/ShareButton";
import Notes from "@/components/Notes";

const formatName = (name) => {
  const trimmedName = (name ?? "").trim().replace(/^[\u2013\u2014-]*/, "");
  return trimmedName === "" ? "Anonymous" : trimmedName;
};

export default function Home() {
  return (
    <motion.div
      className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.35 }}
    >
      <div className="pt-8">
        <ul>
          <Notes />
        </ul>
      </div>
      <div className="flex gap-2 sticky bottom-8 lg:relative lg:bottom-auto z-10 lg:z-auto lg:order-[-1]">
        <Link href="/share" className="btn">
          <span>Share your story</span>
        </Link>
        <ShareButton />
      </div>
    </motion.div>
  );
}
