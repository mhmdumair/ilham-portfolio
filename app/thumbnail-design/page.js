import CategoryShowcasePage from "@/components/CategoryShowcasePage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Thumbnail Design | Ilham Designs",
  description: "YouTube and video thumbnail design projects by Mohamad Ilham.",
};

export default function ThumbnailDesignPage() {
  return (
    <CategoryShowcasePage
      slug="thumbnail"
      label="Thumbnail Design"
      title="Thumbnail Design"
      description="High-CTR thumbnails designed to stop the scroll and earn the click."
      dark={true}
    />
  );
}
