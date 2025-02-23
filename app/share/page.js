"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLongPress } from "use-long-press";

export default function Share() {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const storedNote = localStorage.getItem("myNote");
    if (storedNote) {
      setValue(storedNote);
    }
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      let watch;
      if (value) {
        watch = setTimeout(() => {
          localStorage.setItem("myNote", value);
        }, 200);
      } else {
        localStorage.removeItem("myNote");
      }
      return () => clearTimeout(watch);
    }
  }, [value, isSubmitted]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (!value.trim()) {
      textareaRef.current?.focus();
      setIsSubmitting(false);
      setPressed(false);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSubmitting(true);
    setPressed(false);
    setSubmittedMessage("");
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: value.trim() }),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setSubmittedMessage("Thank you for sharing your story.");
        localStorage.removeItem("myNote");
      } else {
        setSubmittedMessage("Failed to share note. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setSubmittedMessage("Failed to share note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const bind = useLongPress(
    () => {
      handleSubmit();
    },
    {
      threshold: 1000,
      onStart: () => setPressed(true),
      onFinish: () => setPressed(false),
      onCancel: () => setPressed(false),
    }
  );

  return (
    <motion.div
      className="flex font-serif flex-col items-center gap-4 px-8 pb-[25vh]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, type: "spring", bounce: 0.1 }}
    >
      <AnimatePresence key={isSubmitted}>
        {!isSubmitted ? (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="flex flex-col gap-4 w-full items-start lg:max-w-[600px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex gap-2 w-full items-start">
              <textarea
                ref={textareaRef}
                value={value}
                inputMode="text"
                spellCheck="false"
                onChange={handleChange}
                className={`focus-visible:placeholder:text-transparent placeholder:transition-all placeholder:duration-300 placeholder:ease-out min-h-full border-none w-full field-sizing-content px-6 py-4 rounded-lg outline-none resize-none pb-12 transition-all duration-750 ease-out ${
                  pressed || isSubmitting ? "bg-transparent" : "bg-white"
                }`}
                type="text"
                name="note"
                placeholder="Welcome. Share your story"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="btn"
                disabled={isSubmitting}
                {...bind()}
              >
                {isSubmitting ? "Sharing..." : "Share"}
              </button>
              {!isSubmitting && !isSubmitted ? (
                <motion.span
                  className="text-sm text-black/50 tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Press and hold to share
                </motion.span>
              ) : null}
            </div>
          </motion.form>
        ) : (
          <motion.p className="text-black w-full text-center">
            {submittedMessage.split("").map((word, index) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.075 * index, duration: 1 }}
                key={index + word}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
