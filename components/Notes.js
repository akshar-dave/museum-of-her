"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Masonry } from "react-plock";
import categories from "./categories";
import { useAuth } from "@/app/lib/useAuth";
import { getTurnstileToken } from "@/app/lib/turnstile";
import Welcome from "./Welcome";

// Flower SVG paths (now in public folder)
const flowers = [
  "/flowers/1.svg",
  "/flowers/2.svg",
  "/flowers/3.svg",
  "/flowers/4.svg",
  "/flowers/5.svg",
];

const getRandomFlower = () => {
  return flowers[Math.floor(Math.random() * flowers.length)];
};

export default function Notes({ categoryId }) {
  const [notes, setNotes] = useState([]);
  const { user, signInAnonymously, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      let query = supabase.from("notes_view").select("*");
      if (categoryId) {
        query = query.contains("categories", [categoryId]);
      }
      const { data, error } = await query.order("created_at", {
        ascending: false,
      });
      if (error) {
        console.error("Failed to fetch notes:", error);
      } else {
        setNotes(data);
      }
    };
    fetchNotes();
  }, [categoryId]);

  return (
    <>
      <Welcome />
      <Masonry
        items={notes}
        config={{
          columns: [1, 2, 4],
          gap: [16, 16, 16],
          media: [768, 1280, 1920],
        }}
        render={(item) => (
          <Note
            note={item}
            key={item.id}
            user={user}
            onSignIn={signInAnonymously}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    </>
  );
  );
}

const limits = [200, 400, 500];

const formatName = (name) => {
  const trimmedName = (name ?? "").trim().replace(/^[\u2013\u2014-]*/, "");
  return trimmedName === "" ? "Anonymous" : trimmedName;
};

const Note = ({ note, user, onSignIn, isAuthenticated }) => {
  const [expanded, setExpanded] = useState(false);
  const [hugged, setHugged] = useState(false);
  const [hugs, setHugs] = useState(note.hugs || 0);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const noteRef = useRef();
  const isInitialRender = useRef(true);

  // Check if this note has been hugged by the current user
  useEffect(() => {
    if (user) {
      const huggedNotes = JSON.parse(
        localStorage.getItem("huggedNotes") || "[]"
      );
      const isHugged = huggedNotes.includes(note.id);
      setHugged(isHugged);
      if (isHugged && !selectedFlower) {
        setSelectedFlower(getRandomFlower());
      }
    }
  }, [user, note.id, selectedFlower]);

  const hug = async () => {
    // Check if already hugged locally
    const huggedNotes = JSON.parse(localStorage.getItem("huggedNotes") || "[]");
    if (huggedNotes.includes(note.id)) {
      return; // Already hugged, do nothing
    }

    // Immediately add to localStorage and update UI
    const updatedHuggedNotes = [...huggedNotes, note.id];
    localStorage.setItem("huggedNotes", JSON.stringify(updatedHuggedNotes));
    setHugged(true);
    setSelectedFlower(getRandomFlower());

    if (!isAuthenticated) {
      // Get Turnstile token invisibly and sign in
      try {
        const token = await getTurnstileToken();
        await onSignIn(token);
        // Wait a moment for auth to complete
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Failed to sign in:", error);
        return;
      }
    }

    try {
      // Get the current session token
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        console.error("No authentication token available");
        return;
      }

      // Get Turnstile token
      const turnstileToken = await getTurnstileToken();

      const response = await fetch("/api/hug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          noteId: note.id,
          turnstileToken,
        }),
      });

      if (response.ok) {
        // Update hug count
        setHugs((prev) => prev + 1);
      } else {
        console.error("Failed to add hug");
      }
    } catch (error) {
      console.error("Error adding hug:", error);
    }
  };

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
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <span>— </span>
            {formatName(note.name)}
          </p>
          {noteCategories.length > 0 && (
            <p className="text-gray-500 text-sm font-medium">
              {noteCategories
                .map((category, index) => (
                  <span key={category.id}>
                    <Link href={`${category.slug}`}>{category.name}</Link>
                    {index < noteCategories.length - 1 ? ", " : ""}
                  </span>
                ))
                .reduce((prev, curr) => [prev, curr])}
            </p>
          )}
        </div>
        {expanded ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.1, duration: 1 }}
            viewport={{ once: true }}
            type="button"
            className={`flex h-12 w-12 items-center justify-center cursor-pointer aspect-square rounded-full shrink-0 select-none text-xl border focus-visible:outline border-blue-900/20 focus:outline-none interactive ${
              hugged ? "" : "hover:bg-white/50"
            }`}
            onClick={hug}
          >
            {/* {hugs > 0 && <span className="text-xs font-medium">{hugs}</span>} */}
            {hugged && selectedFlower ? (
              <motion.img
                initial={{ scale: 0, opacity: 0, rotate: 30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                src={selectedFlower}
                alt="flower"
                className="w-5 h-5 decoration"
              />
            ) : (
              <span>🫂</span>
            )}
          </motion.button>
        ) : null}
      </div>
    </motion.li>
  );
};
