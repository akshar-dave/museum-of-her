"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import categories from "@/components/categories";
import { supabase } from "@/app/lib/supabaseClient";
import { Masonry } from "react-plock";

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
      <div className="pt-8">
        <ul
          className=""
          // ref={registerMasonry}
        >
          <Masonry
            items={notes}
            config={{
              columns: [1, 2, 4],
              gap: [16, 16, 16],
              media: [768, 1280, 1920],
            }}
            render={(item) => <Note note={item} key={item.id} />}
          />
        </ul>
      </div>
    </motion.div>
  );
}

const limits = [200, 400, 500];

const Note = ({ note }) => {
  const [expanded, setExpanded] = useState(false);
  const noteRef = useRef();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (expanded) return;
    noteRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [expanded]);

  const [limit] = useState(
    () => limits[Math.floor(Math.random() * limits.length)]
  );

  const truncated = note.note.length > limit;

  const displayText = expanded
    ? note.note
    : note.note.slice(0, limit).split(" ").slice(0, -1).join(" ") + "…";

  const noteCategories = categories.filter((category) =>
    note.categories?.includes(category.id)
  );

  return (
    <motion.li
      ref={noteRef}
      key={note.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col transition-all px-6 py-4 pb-6 rounded-xl gap-6 duration-[2s] delay-1000 ${
        expanded ? "bg-white/25" : "bg-white"
      }`}
    >
      <p>
        {displayText}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-500 text-sm p-6 -m-6 -mx-5 cursor-pointer font-medium self-start hover:underline focus-visible:underline outline-0"
        >
          {expanded ? "read less" : "read more"}
        </button>
      </p>

      <div className="flex flex-col gap-0.5">
        <p className="text-gray-500">
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
      </div>
    </motion.li>
  );
};
