import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import PostCarousel from "../PostCarousel";

export default function PostsShowcase({ items = [] }) {
  return (
    <section id="posts-preview" className="py-20 sm:py-28">
      <div className="section-container">
        <Reveal className="text-center">
          <SectionLabel>Social Media Posts</SectionLabel>
          <h2 className="mt-3 font-heading text-3xl font-bold text-ink sm:text-4xl">
            Social Media Post Designs
          </h2>
        </Reveal>

        <div className="mt-12">
          <PostCarousel items={items} />
        </div>

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <Button href="/posts" variant="hot">
            View All Post Designs <span aria-hidden>↗</span>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
