"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isIOS, setIsIOS] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent || "";
      setIsIOS(/iPad|iPhone|iPod/.test(ua));
      setCanShare(typeof window.navigator.share === "function");
    }
  }, []);

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

  const shareData = {
    title: "Museum of Her",
    text: `TW: SA, SH
Hello! I found a website that I thought you’d appreciate - ‘Museum of Her’
It’s a place where women in India can anonymously share their stories of sexual assault and harrassment.
It’s like a wall - makes you feel a quiet solidarity. You can share yourself, or you can just read the experiences of others..

Check it out here: https://museum-of-her.pages.dev`,
    url: "https://museum-of-her.pages.dev",
  };

  const handleShare = useCallback(() => {
    navigator.share?.(shareData).catch((err) => {
      console.error("Error sharing", err);
    });
  }, []);

  return (
    <motion.div
      className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.35 }}
    >
      <div className="flex gap-2">
        <Link href="/share" className="btn">
          <span>Share your story</span>
        </Link>
        {canShare && (
          <button className="btn" onClick={handleShare}>
            {isIOS ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
              fill="#000"
            >
              <path d="M252.31-60Q222-60 201-81q-21-21-21-51.31v-415.38Q180-578 201-599q21-21 51.31-21h102.3v60h-102.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v415.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-415.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85h-102.3v-60h102.3Q738-620 759-599q21 21 21 51.31v415.38Q780-102 759-81q-21 21-51.31 21H252.31ZM450-330v-441.23l-74 74L333.85-740 480-886.15 626.15-740 584-697.23l-74-74V-330h-60Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#000"
            >
              <path d="M672.22-100q-44.91 0-76.26-31.41-31.34-31.41-31.34-76.28 0-6 4.15-29.16L284.31-404.31q-14.46 15-34.36 23.5t-42.64 8.5q-44.71 0-76.01-31.54Q100-435.39 100-480q0-44.61 31.3-76.15 31.3-31.54 76.01-31.54 22.74 0 42.64 8.5 19.9 8.5 34.36 23.5l284.46-167.08q-2.38-7.38-3.27-14.46-.88-7.08-.88-15.08 0-44.87 31.43-76.28Q627.49-860 672.4-860t76.25 31.44Q780-797.13 780-752.22q0 44.91-31.41 76.26-31.41 31.34-76.28 31.34-22.85 0-42.5-8.69Q610.15-662 595.69-677L311.23-509.54q2.38 7.39 3.27 14.46.88 7.08.88 15.08t-.88 15.08q-.89 7.07-3.27 14.46L595.69-283q14.46-15 34.12-23.69 19.65-8.69 42.5-8.69 44.87 0 76.28 31.43Q780-252.51 780-207.6t-31.44 76.25Q717.13-100 672.22-100Z" />
            </svg>
            )}
          </button>
        )}
      </div>
      <div className="pt-8">
        <ul className="">
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

const limits = [
  200, 240, 430, 270, 310, 490, 220, 360, 410, 290, 300, 460, 380, 340, 270,
  440, 390, 500,
];
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

  const displayText =
    expanded || !truncated
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
        {truncated ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 text-sm p-3 -m-3 cursor-pointer font-medium self-start hover:underline focus-visible:underline outline-0 group interactive"
          >
            <span className="p-2 py-1.5 rounded-full group-focus-visible:bg-blue-100">
              {expanded ? "read less" : "read more"}
            </span>
          </button>
        ) : null}
      </p>

      <div className="flex flex-col gap-0.5">
        <p className="text-gray-500 text-sm">
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
