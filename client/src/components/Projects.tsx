import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import manualProjects from "@/data/manualProjects";

interface Project {
  name: string;
  description: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  image: string;
  technologies: string[];
}

export default function Projects() {
  const { data: githubProjects } = useQuery<Project[]>({
    queryKey: ["/api/github/projects"],
  });

  // Always show manual projects; append GitHub pinned repos when loaded
  const projects: Project[] = githubProjects
    ? [...manualProjects, ...githubProjects]
    : manualProjects;

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [overflowing, setOverflowing] = useState<Record<string, boolean>>({});
  const descRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  useEffect(() => {
    if (!projects) return;
    const result: Record<string, boolean> = {};
    for (const project of projects) {
      const el = descRefs.current[project.name];
      if (el) {
        result[project.name] = el.scrollHeight > el.clientHeight;
      }
    }
    setOverflowing(result);
  }, [projects]);

  const toggleExpanded = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
              <article key={project.name} className="project-card group">
                <div className="relative overflow-hidden">
                  <img
                    src={`/images/${project.name}.png`}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = project.image; }}
                    alt={`${project.name} project screenshot`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {project.name}
                  </h3>

                  <div className="mb-4">
                    <p
                      ref={(el) => { descRefs.current[project.name] = el; }}
                      className={`text-gray-600 leading-relaxed ${expanded[project.name] ? "" : "line-clamp-2"}`}
                    >
                      {project.description}
                    </p>
                    {(overflowing[project.name] || expanded[project.name]) && (
                      <button
                        onClick={() => toggleExpanded(project.name)}
                        className="flex items-center text-sm text-gray-400 hover:text-gray-600 mt-1 transition-colors duration-200"
                      >
                        {expanded[project.name] ? (
                          <><ChevronUp className="w-4 h-4 mr-1" />Show less</>
                        ) : (
                          <><ChevronDown className="w-4 h-4 mr-1" />Show more</>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    {project.githubUrl && (
                      <button
                        onClick={() => handleLinkClick(project.githubUrl!)}
                        className="flex items-center text-primary hover:text-accent font-medium transition-colors duration-300"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </button>
                    )}
                    {project.liveUrl && (
                      <button
                        onClick={() => handleLinkClick(project.liveUrl!)}
                        className="flex items-center text-primary hover:text-accent font-medium transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
