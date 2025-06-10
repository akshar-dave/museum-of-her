import Notes from "@/components/Notes";
import ShareGroup from "@/components/ShareGroup";

export const metadata = {
  title: `Online | The Museum of Her`,
  description: `Notes in the Online category`,
};

export default function Online() {
  return (
    <div className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[50vh]">
      <div className="pt-8">
        <ul>
          <Notes categoryId={5} />
        </ul>
      </div>
      <ShareGroup />
    </div>
  );
}
