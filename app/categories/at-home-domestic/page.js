import Link from 'next/link';
import { motion } from 'framer-motion';
import categories from '@/components/categories';
import NoteList from '@/components/NoteList';

const category = categories.find((c) => c.slug === 'at-home-domestic');

export const metadata = {
  title: `${category.name} | The Museum of Her`,
  description: `Notes in the ${category.name} category`,
};

export default function AtHomeDomestic() {
  return (
    <motion.div
      className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.35 }}
    >
      <Link href="/" className="btn">
        All notes
      </Link>
      <h2 className="pt-4 text-lg font-medium">{category.name}</h2>
      <div className="pt-8">
        <NoteList categoryId={category.id} />
      </div>
    </motion.div>
  );
}
