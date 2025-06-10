import Link from "next/link";
import Notes from "@/components/Notes";

export const metadata = {
  title: `Community | The Museum of Her`,
  description: `Notes in the Community category`,
};

export default function Community() {
  return (
    <div className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[50vh]">
      <Link href="/share" className="btn">
        Share your story
      </Link>
      <div className="pt-8">
        <ul>
          <Notes categoryId={6} />
        </ul>
      </div>
    </div>
  );
}
