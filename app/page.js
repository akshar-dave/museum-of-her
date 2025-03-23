"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import categories from "@/components/categories";
import { registerMasonry } from 'masonry-pf';
import { supabase } from "@/app/lib/supabaseClient";


const formatName = (name) => {
  const trimmedName = (name ?? "").trim().replace(/^[\u2013\u2014-]*/, "");
  return trimmedName === "" ? "Anonymous" : trimmedName;
};

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes_view")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch notes:", error);
      } else {
        setNotes(data);
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
        <ul className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-[masonry] gap-4 items-start"
        ref={registerMasonry}
        >
          {notes.map((note) => {
            const noteCategories = categories.filter((category) =>
              note.categories?.includes(category.id)
            );

            return (
              <motion.li
                key={note.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white flex flex-col px-6 py-4 pb-6 rounded-xl gap-6"
              >
                <p>{note.note}</p>
                <p className="text-black/50">
                  <span>— </span>
                  {formatName(note.name)}
                </p>
                {noteCategories.length > 0 && (
                  <p className="text-gray-500 text-sm font-medium">
                    {noteCategories
                      .map((category, index) => (
                        <span key={category.id}>
                          <a href="#">{category.name}</a>
                          {index < noteCategories.length - 1 ? ", " : ""}
                        </span>
                      ))
                      .reduce((prev, curr) => [prev, curr])}
                  </p>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
