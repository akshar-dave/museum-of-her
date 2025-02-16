"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";

const COLORS = {
  white: {
    background: "#FFFFFF",
    outline: "#E8E8E8",
  },
  gray: {
    background: "#E8E8E8",
  },
  purple: {
    background: "#E9E5F4",
  },
  green: {
    background: "#E0ECE0",
  },
  orange: {
    background: "#F5E3E1",
  },
  blue: {
    background: "#DBEBF3",
  },
  red: {
    background: "#F5E3E7",
  },
  yellow: {
    background: "#ECE8DA",
  },
};

export default function Home() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    // only log afgter typing stops 1000ms
    const timeout = setTimeout(() => {
      console.log(value);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        strategy="beforeInteractive"
      />
      <Script
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "e1f5bffe0f554c69b85149e6b9d69159"}'
        defer
        strategy="afterInteractive"
      />
      <motion.main className="flex min-h-screen font-serif flex-col items-center gap-4 pt-24">
        <div className="flex gap-4 -ml-6">
          <motion.div
            initial={{ opacity: 0, y: 30, x: 30 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 3 }}
          >
            <Image
              src="/dove.gif"
              alt="The Museum of Her"
              priority
              width={64}
              height={64}
              className=""
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-sm uppercase pb-2 border-b border-black/25 flex flex-col items-start font-light font-serif tracking-wide text-black"
          >
            <span>The</span>
            <span>Museum</span>{" "}
            <span>
              <span className="lowercase italic">of</span> Her
            </span>
          </motion.h1>
        </div>
        <form className="flex flex-col gap-4 w-full lg:max-w-[600px]">
          <div className="flex gap-2 items-start">
            <textarea
              value={value}
              onChange={handleChange}
              className="focus:placeholder:text-transparent w-full min-h-[100px] field-sizing-content border-b border-black/10 outline-none resize-none"
              type="text"
              placeholder="Welcome. Share your story"
            />

            <div className="flex gap-4">
              <div className="flex flex-col">
                {Object.keys(COLORS).map((color) => (
                  <button type="button" key={color} className="p-3 group">
                    <div
                      className="w-6 h-6 rounded-full group-hover:scale-110 group-active:scale-95 transition-all duration-100 ease-out"
                      style={{
                        backgroundColor: COLORS[color].background,
                        border: `1px solid ${COLORS[color].outline}`,
                      }}
                    />
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="bg-black text-white rounded-full px-4 py-1 max-w-fit uppercase text-xs tracking-widest"
          >
            Share
          </button>
        </form>
      </motion.main>
    </>
  );
}
