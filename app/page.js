"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");
        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <motion.div
      className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.35 }}
    >
      <Link href="/share" className="btn">
        Share your story
      </Link>
      <div>
        <ul className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 items-start">
          {notes.map((note) => (
            <motion.li
              key={note.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white flex flex-col px-6 py-4 pb-6 rounded-xl gap-6"
            >
              <p>{note.note}</p>
              <p className="text-black/50">
                <span>— </span>
                {note.name ?? "Anonymous"}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
