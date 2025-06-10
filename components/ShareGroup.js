import Link from "next/link";
import ShareButton from "@/components/ShareButton";

const ShareGroup = () => {
  return (
    <div className="flex gap-2 fixed bottom-8 lg:relative lg:bottom-auto z-10 lg:z-auto lg:order-[-1]">
      <Link href="/share" className="btn">
        <span>Share your story</span>
      </Link>
      <ShareButton />
    </div>
  );
};

export default ShareGroup;
