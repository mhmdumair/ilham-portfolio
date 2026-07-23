import CategoryShowcasePage from "@/components/CategoryShowcasePage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Packaging & Mockup Design | Ilham Designs",
  description: "Packaging and product mockup design projects by Mohamad Ilham.",
};

export default function PackagingMockupPage() {
  return (
    <CategoryShowcasePage
      slug="packaging"
      label="Packaging & Mockup"
      title="Packaging & Mockup Design"
      description="Product packaging and realistic mockups that make brands look shelf-ready."
      dark={true}
    />
  );
}
