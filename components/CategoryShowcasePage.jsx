import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import ContactFooter from "@/components/sections/ContactFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getImagesByCategory } from "@/lib/data";

export default async function CategoryShowcasePage({
  slug,
  label,
  title,
  description,
  dark = true,
}) {
  const items = await getImagesByCategory(slug);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader label={label} title={title} description={description} />
        <section className={`${dark ? "bg-navy" : ""} pb-20 sm:pb-28`}>
          <div className="section-container">
            <PortfolioGrid items={items} dark={dark} />
          </div>
        </section>
      </main>
      <ContactFooter />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}
