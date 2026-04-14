export interface ManualProject {
  name: string;
  description: string;
  image: string; // local path (e.g. /images/myproject.png) or external URL
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Add private or non-GitHub projects here. They will appear after pinned GitHub repos.
const manualProjects: ManualProject[] = [
  // Example:
  // {
  //   name: "My Project",
  //   description: "A project I built.",
  //   image: "/images/My Project.png",
  //   technologies: ["React", "Node.js"],
  //   githubUrl: "https://github.com/ereilly89/my-project", // optional
  //   liveUrl: "https://example.com",                       // optional
  // },
  {
     name: "Fit to Scale",
     description: "Web designing & building agency and CRM for local service businesses.",
     image: "/images/fittoscale.png",
     technologies: ["Next.js", "React.js", "TypeScript 5", "Tailwind CSS", "Radix UI", "Lucide React", "Shadcn/ui", "Supabase", "Anthropic SDK", "Resend", "Stripe API", "Drop Box Sign API"],
     liveUrl: "https://fittoscale.io"
  },
  {
     name: "Kova Clean",
     description: "Cleaning Service Website for a local business in Rochester, MN.",
     image: "/images/kova-clean.png",
     technologies: ["Next.js", "React.js", "TypeScript 5", "Tailwind CSS", "Lucide React", "Shadcn/ui", "Supabase", "Resend", "Stripe API", "Drop Box Sign API"],
     liveUrl: "https://kova-clean.com"
  },
  {
     name: "Fitness as a Service Platform",
     description: "A SaaS platform enabling personal trainers to grow their business online.",
     image: "/images/fittoscale_cover1.png",
     technologies: ["React.js", "Node.js", "MySQL", "MongoDB", "Docker", "Stripe API"],
     githubUrl: "https://github.com/ereilly89/faas-client", // optional
  },
];

export default manualProjects;
