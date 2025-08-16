import Notes from "@/components/Notes";
import ShareGroup from "@/components/ShareGroup";

export const metadata = {
  title: `Community | The Museum of Her`,
  description: `Notes in the Community category`,
};

export default function Community() {
  return (
    <div className="flex min-h-screen font-serif flex-col items-center gap-4 px-4 pb-[50vh]">
      <div className="pt-8">
        <ul>
          <Notes categoryId={6} />
        </ul>
      </div>
      <ShareGroup />
    </div>
  );
}
