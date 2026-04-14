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
     technologies: ["Next.js", "React.js", "TypeScript 5", "Tailwind CSS", "Radix UI", "Lucide React", "Shadcn/ui", "Supabase", "Anthropic SDK", "Resend API", "Stripe API", "Drop Box Sign API"],
     liveUrl: "https://fittoscale.io"
  },
  {
     name: "Kova Clean",
     description: "Full website and quoting tool for a cleaning Service in Rochester, MN.",
     image: "/images/kova-clean.png",
     technologies: ["Next.js", "React.js", "TypeScript 5", "Tailwind CSS", "Lucide React", "Shadcn/ui", "Supabase", "Resend API", "Stripe API", "Drop Box Sign API"],
     liveUrl: "https://kova-clean.com"
  },
  {
     name: "Fitness as a Service Platform",
     description: "A SaaS platform enabling personal trainers to grow their business online.",
     image: "/images/fittoscale_cover1.png",
     technologies: ["React.js", "Node.js", "MySQL", "MongoDB", "Docker", "Stripe API", "S3", "EC2", "EBS", "ELB", "CloudWatch", "Route 53", "CloudFront"],
     githubUrl: "https://github.com/ereilly89/faas-client", // optional
  },
];

export default manualProjects;

// Override fields for GitHub-fetched projects. Key is the exact GitHub repo name.
// Any field specified here will replace what GitHub returns.
export const projectOverrides: Record<string, { name?: string; technologies?: string[]; description?: string }> = {
  // Example:
  // "my-repo": {
  //   technologies: ["React", "TypeScript", "Node.js"],
  // },
  "chicago-housing-rental-app": {
    name: "Chicago Housing Rental App",
    technologies: ["Node.js", "JavaScript", "MongoDB", "Vertex AI"],
  },
  "cloutmanager-discordbot": {
    name: "Bitclout Bot",
    technologies: ["Python", "MongoDB", "Discord.py"],
  },
  "reilly-economy-minecraft-plugin": {
    name: "Minecraft Economy Plugin",
    technologies: ["Java", "Bukkit API"],
  },
  "uww-alumni-web-app": {
    name: "UWW CompSci Alumni App",
    technologies: ["Java", "JavaScript", "MySQL", "Python", "Google Maps API"],
  },
  "intentional-sequence-xai": {
    name: "Intentional Sequences",
    technologies: ["Python", "Explainable AI", "Reinforcement Learning"],
  },
  "k8s-rag-chatbot": {
    name: "Kubernetes RAG Agent",
    technologies: ["Python", "Anthropic API", "LlamaIndex", "ChromaDB", "HuggingFace Transformers", "Streamlit UI", "beautifulsoup4", "Docker"],
  }
};
