import ShareForm from "@/components/ShareForm";
import categories from "@/components/categories";

export default async function Share() {
  return <ShareForm categories={categories} />;
}
