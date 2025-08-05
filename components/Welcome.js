"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export default function Welcome() {
  const [open, setOpen] = useState(false);
  const [isNightTime, setIsNightTime] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = parseInt(localStorage.getItem("gateTimestamp") || "0", 10);
    const expired = !stored || Date.now() - stored > THIRTY_DAYS;
    if (expired) {
      setOpen(true);
    }

    // Check if it's nighttime (9 PM to 4 AM)
    const now = new Date();
    const hour = now.getHours();
    setIsNightTime(hour >= 21 || hour < 4);
  }, []);

  const handleProceed = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gateTimestamp", Date.now().toString());
    }
    setOpen(false);
  };

  if (pathname === "/resources") {
    return null;
  }

  if (!open) return null;

  return (
    <div className="fixed flex inset-0 m-0 p-0 w-full h-full z-20 bg-white/80 backdrop-blur-xs items-center justify-center">
      <div className="flex justify-center flex-col gap-8 pb-16 items-center text-center px-6 max-w-md">
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#ffcc02"
          >
            <path d="M109-120q-11 0-20-5.5T75-140q-5-9-5.5-19.5T75-180l370-640q6-10 15.5-15t19.5-5q10 0 19.5 5t15.5 15l370 640q6 10 5.5 20.5T885-140q-5 9-14 14.5t-20 5.5H109Zm371-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm0-120q17 0 28.5-11.5T520-400v-120q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v120q0 17 11.5 28.5T480-360Z" />
          </svg>
          <p className="text-lg font-sans font-semibold">Trigger Warning</p>
          <p>
            This website contains anonymous stories of harassment,
            discrimination, and violence shared by women. The&nbsp;content is
            deeply personal and may be triggering. Viewer discretion is advised.
          </p>
          {isNightTime && (
            <p>
              Some stories weigh heavier at night. Make sure you&apos;re okay. Maybe
              come back to this in the morning.
            </p>
          )}
        </div>
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <button className="btn" onClick={handleProceed}>
            I Understand and Wish to Proceed
          </button>
          <Link href="/resources" className="btn">
            Exit to Resources
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
