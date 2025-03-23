"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLongPress } from "use-long-press";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import Script from "next/script";

const ShareForm = ({ categories = [] }) => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const textareaRef = useRef(null);
  const router = useRouter();
  const turnstileRef = useRef(null);

  useEffect(() => {
    const initializeTurnstile = () => {
      if (window.turnstile) {
        window.turnstile.render(".cf-turnstile", {
          sitekey: "0x4AAAAAAA89GzESq3w9jvRi",
        });
      }
    };

    const cleanupTurnstile = () => {
      if (window.turnstile) {
        window.turnstile.reset(turnstileRef.current);
      }
    };

    initializeTurnstile();

    const handleRouteChange = () => {
      cleanupTurnstile();
      initializeTurnstile();
    };

    router.events?.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange);
      cleanupTurnstile();
    };
  }, [router]);

  useEffect(() => {
    const storedNote = localStorage.getItem("myNote");
    if (storedNote) {
      try {
        const parsedNote = JSON.parse(storedNote);
        setName(parsedNote.name || "");
        setNote(parsedNote.note.trim() || "");
        setSelectedCategories(parsedNote.categories || []);
      } catch (error) {
        console.error("Error parsing stored note:", error);
        localStorage.removeItem("myNote");
      }
    }
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      let watch;
      if (note.trim() || name || selectedCategories) {
        watch = setTimeout(() => {
          localStorage.setItem(
            "myNote",
            JSON.stringify({
              name: name,
              note: note.trim(),
              categories: selectedCategories,
            })
          );
        }, 200);
      } else {
        localStorage.removeItem("myNote");
      }
      return () => clearTimeout(watch);
    }
  }, [note, isSubmitted, name, selectedCategories]);

  const handleSubmit = async () => {
    if (!note.trim()) {
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
      const turnstile = window.turnstile;
      const token = turnstile.getResponse();
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          note: note.trim(),
          turnstileToken: token,
          categories: selectedCategories,
        }),
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
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
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
              <div
                className={`flex gap-2 w-full items-start flex-col px-6 py-4  ${
                  pressed || isSubmitting ? "bg-transparent" : "bg-white"
                } transition-[background] duration-1000 ease-out rounded-lg`}
              >
                <TextareaAutosize
                  ref={textareaRef}
                  minRows={8}
                  value={note}
                  inputMode="text"
                  spellCheck="false"
                  onChange={(e) => setNote(e.target.value)}
                  className="focus-visible:placeholder:text-transparent placeholder:transition-all placeholder:duration-300 placeholder:ease-out min-h-full border-none w-full rounded-lg outline-none resize-none pb-12"
                  type="text"
                  name="note"
                  placeholder="Welcome. Share your story"
                  disabled={isSubmitting}
                />

                <hr className="w-full text-black/20" />

                <div className="w-full relative flex items-center">
                  <input
                    value={name}
                    inputMode="text"
                    spellCheck="false"
                    onChange={(e) => setName(e.target.value)}
                    className="min-h-full border-none peer w-full py-4 pl-4 rounded-lg outline-none resize-none transition-all duration-500 ease-out"
                    maxLength={14}
                    type="text"
                    name="name"
                    placeholder="Your name, or a pseudonym"
                    disabled={isSubmitting}
                  />
                  <span className="absolute left-0 peer-[focus-within]:opacity-0 transition-all duration-500">
                    —
                  </span>
                </div>
              </div>

              <p
                className={`text-black/50 pointer-events-none px-6 select-none`}
              >
                Feel free to share it with your name, your name&apos;s initials
                or leave it blank. We&apos;ll auto-assign a random initial if
                left blank.
              </p>

              <div
                className={`mt-2 flex flex-col gap-2 w-full items-start px-6 py-4 rounded-lg ${
                  pressed || isSubmitting ? "bg-transparent" : "bg-white"
                } transition-[background] duration-1000 ease-out`}
              >
                <p>
                  Type of incident{" "}
                  <span className="opacity-40">(optional)</span>
                </p>
                {categories ? (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className={`rounded-full flex items-center pl-0 px-2 py-1 gap-1 text-black cursor-pointer select-none `}
                      >
                        <input
                          type="checkbox"
                          value={category.id}
                          className="sr-only peer"
                          defaultChecked={selectedCategories.includes(
                            category.id
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                category.id,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (id) => id !== category.id
                                )
                              );
                            }
                          }}
                        />
                        <span
                          className={`h-3 w-3 ${
                            selectedCategories.includes(category.id)
                              ? "bg-blue-500"
                              : ""
                          } flex rounded-full border border-blue-200`}
                        />
                        <span
                          className={`${
                            selectedCategories.includes(category.id)
                              ? "border-blue-500 bg-blue-100"
                              : "border-transparent"
                          } border-b-2 pb-0.5 px-1`}
                        >
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>

              <Divider />

              <div className="flex items-center justify-end w-full gap-4">
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
                <button
                  type="button"
                  className="btn"
                  disabled={isSubmitting}
                  {...bind()}
                >
                  {isSubmitting ? "Sharing..." : "Share"}
                </button>
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
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAA89GzESq3w9jvRi"
          data-size="flexible"
          data-appearance="interaction-only"
          ref={turnstileRef}
        ></div>
      </motion.div>
    </>
  );
};

export default ShareForm;

const Divider = () => {
  return <hr className="w-full text-white" />;
};
