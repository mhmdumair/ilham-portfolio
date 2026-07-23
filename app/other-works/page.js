import CategoryShowcasePage from "@/components/CategoryShowcasePage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Other Works | Ilham Designs",
  description: "Other independent design projects by Mohamad Ilham.",
};

export default function OtherWorksPage() {
  return (
    <CategoryShowcasePage
      slug="other"
      label="Other Works"
      title="Other Works"
      description="A mix of independent design projects that don't fit neatly into one category."
      dark={true}
    />
  );
}
