import CategoryShowcasePage from "@/components/CategoryShowcasePage";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resume Design | Ilham Designs",
  description: "Resume and CV design projects by Mohamad Ilham.",
};

export default function ResumeDesignPage() {
  return (
    <CategoryShowcasePage
      slug="resume"
      label="Resume Design"
      title="Resume Design"
      description="Clean, recruiter-friendly resumes designed to make a strong first impression."
      dark={true}
    />
  );
}
