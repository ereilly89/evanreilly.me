import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description: "A comprehensive admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management features.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      githubUrl: "https://github.com/ereilly89",
      liveUrl: "#",
    },
    {
      id: 2,
      title: "Social Connect Platform",
      description: "A modern social media platform with real-time messaging, post sharing, and community features built with scalability in mind.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/ereilly89",
      liveUrl: "#",
    },
    {
      id: 3,
      title: "TaskFlow Manager",
      description: "An intuitive task management system with drag-and-drop functionality, team collaboration tools, and progress tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Vue.js", "Python", "Django", "Redis"],
      githubUrl: "https://github.com/ereilly89",
      liveUrl: "#",
    },
    {
      id: 4,
      title: "Weather Analytics App",
      description: "A beautiful weather application with detailed forecasts, historical data analysis, and interactive maps for weather visualization.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["React Native", "TypeScript", "GraphQL", "AWS"],
      githubUrl: "https://github.com/ereilly89",
      liveUrl: "#",
    },
    {
      id: 5,
      title: "Crypto Portfolio Tracker",
      description: "A comprehensive cryptocurrency portfolio tracker with real-time price updates, portfolio analytics, and market trend analysis.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Prisma"],
      githubUrl: "https://github.com/ereilly89",
      liveUrl: "#",
    },
    {
      id: 6,
      title: "FitTrack Mobile App",
      description: "A comprehensive fitness tracking mobile application with workout planning, progress tracking, and social features for motivation.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      technologies: ["Flutter", "Firebase", "Machine Learning", "REST API"],
      githubUrl: "https://github.com/ereilly89",
      liveUrl: "#",
    },
  ];

  const handleLinkClick = (url: string) => {
    if (url !== "#") {
      window.open(url, "_blank", "noopener noreferrer");
    }
  };

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <article key={project.id} className="project-card group">
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleLinkClick(project.githubUrl)}
                    className="flex items-center text-primary hover:text-accent font-medium transition-colors duration-300"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </button>
                  <button
                    onClick={() => handleLinkClick(project.liveUrl)}
                    className="flex items-center text-primary hover:text-accent font-medium transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
