import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import PostCarousel from "@/components/PostCarousel";
import ContactFooter from "@/components/sections/ContactFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getImagesByCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Social Media Post Designs | Ilham Designs",
  description:
    "A showcase of social media post designs by Mohamad Ilham — Instagram, Facebook, promotional and event graphics.",
};

export default async function PostsPage() {
  const posts = await getImagesByCategory("posts");

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Social Media Posts"
          title="Social Media Post Designs"
          description="Scroll-stopping posts designed to boost engagement and grow brands across every platform."
        />
        <section className="py-20 sm:py-28">
          <div className="section-container">
            <PostCarousel items={posts} layout="grid" />
          </div>
        </section>
      </main>
      <ContactFooter />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}
