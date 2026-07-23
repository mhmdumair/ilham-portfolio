import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import Services from "@/components/sections/Services";
import LogoShowcase from "@/components/sections/LogoShowcase";
import PostsShowcase from "@/components/sections/PostsShowcase";
import MoreWork from "@/components/sections/MoreWork";
import ToolsStats from "@/components/sections/ToolsStats";
import Testimonials from "@/components/sections/Testimonials";
import ContactFooter from "@/components/sections/ContactFooter";
import ScrollToTop from "@/components/ui/ScrollToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getImagesByCategory, getImagesByCategories } from "@/lib/data";
import { categories } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function Home() {
  const moreWorkCategories = categories.filter(
    (c) => c.slug !== "logo" && c.slug !== "posts"
  );

  const [logos, posts, moreWorkItems] = await Promise.all([
    getImagesByCategory("logo"),
    getImagesByCategory("posts"),
    getImagesByCategories(moreWorkCategories.map((c) => c.slug)),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Services />
        <LogoShowcase items={logos} />
        <PostsShowcase items={posts} />
        <MoreWork categories={moreWorkCategories} itemsByCategory={moreWorkItems} />
        <ToolsStats />
        <Testimonials />
      </main>
      <ContactFooter />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}
