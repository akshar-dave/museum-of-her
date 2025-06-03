import Link from "next/link";
import { motion } from "framer-motion";
import NoteList from "@/components/NoteList";

export default function Home() {
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
        <ul>
          <NoteList />
        </ul>
      </div>
    </motion.div>
  );
}
