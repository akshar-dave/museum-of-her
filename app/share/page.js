export const runtime = "edge";

import ShareForm from "@/components/ShareForm";

export default async function Share() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "http://localhost:3000"; // Use local URL in development

  const getCategories = await fetch(`${baseUrl}/api/categories`, {
    cache: "force-cache",
  });

  if (!getCategories.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categoriesResponse = await getCategories.json();

  return <ShareForm categories={categoriesResponse.categories} />;
}
