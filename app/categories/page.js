'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import categories from '@/components/categories';

export default function CategoriesIndex() {
  return (
    <motion.div
      className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[25vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.35 }}
    >
      <Link href="/" className="btn">
        All notes
      </Link>
      <div className="pt-8 flex flex-col gap-2 w-full max-w-md">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="underline hover:no-underline"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
