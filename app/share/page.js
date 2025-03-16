export const runtime = "edge";

import ShareForm from "@/components/ShareForm";

export default function Share() {
  return <ShareWrapper />;
}

async function ShareWrapper() {
  async function fetchCategories() {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL
        : "http://localhost:3000"; // Use local URL in development

    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  }

  const { categories } = await fetchCategories();

  return <ShareForm categories={categories} />;
}
