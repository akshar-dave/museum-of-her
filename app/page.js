import Notes from "@/components/Notes";
import ShareGroup from "@/components/ShareGroup";

export default function Home() {
  return (
    <div className="flex min-h-screen font-serif flex-col items-center gap-4 px-4 pb-[50vh]">
      <div className="pt-8">
        <ul>
          <Notes />
        </ul>
      </div>
      <ShareGroup />
    </div>
  );
}
