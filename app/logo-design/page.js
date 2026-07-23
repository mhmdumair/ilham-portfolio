import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import LogoGrid from "@/components/LogoGrid";
import ContactFooter from "@/components/sections/ContactFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getImagesByCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Logo Design Work | Ilham Designs",
  description:
    "A showcase of logo design projects by Mohamad Ilham — minimal, modern, typography and abstract marks.",
};

export default async function LogoDesignPage() {
  const logos = await getImagesByCategory("logo");

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Logo Design"
          title="Logo Design Work"
          description="Memorable, distinctive marks crafted for brands across industries. Filter by style to explore the full collection."
        />
        <section className="bg-navy pb-20 sm:pb-28">
          <div className="section-container">
            <LogoGrid items={logos} />
          </div>
        </section>
      </main>
      <ContactFooter />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}
