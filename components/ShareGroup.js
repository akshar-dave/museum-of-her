import Link from "next/link";
import ShareButton from "@/components/ShareButton";

const ShareGroup = () => {
  return (
    <div
      className="flex gap-2 fixed bottom-8 lg:sticky lg:top-10 lg:bottom-auto z-[1] lg:z-auto lg:order-[-1]"
    >
      <Link href="/share" className="btn">
        <span>Share your story</span>
      </Link>
      <ShareButton />
    </div>
  );
};

export default ShareGroup;
