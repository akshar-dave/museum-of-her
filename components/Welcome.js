"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export default function Welcome() {
  const dialogRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = parseInt(localStorage.getItem("gateTimestamp") || "0", 10);
    if (!stored || Date.now() - stored > THIRTY_DAYS) {
      dialogRef.current?.showModal();
    }
  }, []);

  const handleProceed = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("gateTimestamp", Date.now().toString());
    }
    dialogRef.current?.close();
  };

  if (pathname === "/resources") {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 p-0 w-full h-full bg-white/10 backdrop-blur-lg flex items-center justify-center"
    >
      <div className="flex flex-col gap-6 text-center px-6 max-w-md">
        <p className="text-lg font-semibold">Trigger Warning ⚠️</p>
        <p>
          This website contains anonymous stories of harassment, discrimination,
          and violence shared by women. The content is deeply personal and may
          be triggering. Viewer discretion is advised.
        </p>
        <div className="flex flex-col gap-2">
          <button className="btn" onClick={handleProceed}>
            I Understand and Wish to Proceed
          </button>
          <Link href="/resources" className="btn">
            Exit to Resources
          </Link>
        </div>
      </div>
    </dialog>
  );
}
