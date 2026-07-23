export const categories = [
  { slug: "logo", label: "Logo Design", route: "/logo-design", theme: "dark" },
  { slug: "posts", label: "Social Media Posts", route: "/posts", theme: "light" },
  { slug: "flyer", label: "Flyer Design", route: "/flyer-design", theme: "dark" },
  { slug: "packaging", label: "Packaging & Mockup", route: "/packaging-mockup", theme: "dark" },
  { slug: "thumbnail", label: "Thumbnail Design", route: "/thumbnail-design", theme: "dark" },
  { slug: "resume", label: "Resume Design", route: "/resume-design", theme: "dark" },
  { slug: "other", label: "Other Works", route: "/other-works", theme: "dark" },
];

export const categorySlugs = categories.map((c) => c.slug);

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}
