import CategoryShowcasePage from "@/components/CategoryShowcasePage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Flyer Design | Ilham Designs",
  description: "Flyer design projects by Mohamad Ilham — promotional, event and business flyers.",
};

export default function FlyerDesignPage() {
  return (
    <CategoryShowcasePage
      slug="flyer"
      label="Flyer Design"
      title="Flyer Design"
      description="Bold, print-ready flyers designed to grab attention and get the message across fast."
      dark={true}
    />
  );
}
