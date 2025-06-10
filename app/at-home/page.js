import Notes from "@/components/Notes";
import ShareGroup from "@/components/ShareGroup";

export const metadata = {
  title: `At home | The Museum of Her`,
  description: `Notes in the At home category`,
};

export default function AtHome() {
  return (
    <div className="flex min-h-screen font-serif flex-col items-center gap-4 px-8 pb-[50vh]">
      <div className="pt-8">
        <ul>
          <Notes categoryId={3} />
        </ul>
      </div>
      <ShareGroup />
    </div>
  );
}
