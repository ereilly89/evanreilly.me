import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "fittoscale.io",
      description: "A SaaS platform enabling personal trainers to grow their business online.",
      image: "/images/fittoscale_cover.png",
      technologies: ["React.js", "Node.js", "MySQL", "MongoDB", "Docker", "Stripe API"],
      //githubUrl: "https://github.com/ereilly89",
      liveUrl: "https://fittoscale.io",
    },
    {
      id: 2,
      title: "Bitclout Bot",
      description: "Discord bot with cryptocurrency & blockchain, includes borrowing/lending protocol, NFT royalties, sports betting, casino games and more.",
      image: "/images/cloutmanager_cover.png",
      technologies: ["Python", "MongoDB", "Discord.py"],
      githubUrl: "https://github.com/ereilly89/cloutmanager-discordbot",
      //liveUrl: "#",
    },
    {
      id: 3,
      title: "Intentional Sequences",
      description: "Published an XAI method for reinforcement learning agents, summarizing policies by extracting intentional sequences of behavior.",
      image: "/images/intentionalsequences_cover.png",
      technologies: ["Python", "XAI", "Reinforcement Learning"],
      githubUrl: "https://github.com/ereilly89/intentional-sequence-xai",
      thesisUrl: "https://minds.wisconsin.edu/bitstream/handle/1793/82594/Thesis_Reilly_Final_Draft.pdf?sequence=1&isAllowed=y",
    },
    {
      id: 4,
      title: "Real Estate Rental App",
      description: "Chicago housing rental web platform with machine learning rental price recommendation.",
      image: "/images/chicagoairbnb_cover.jpeg",
      technologies: ["Node.js", "JavaScript", "MongoDB"],
      githubUrl: "https://github.com/ereilly89/chicago-housing-rental-app",
      //liveUrl: "#",
    },
    {
      id: 5,
      title: "Minecraft Economy Plugin",
      description: "Plugin enabling gold, iron, diamond, and emerald trade markets with real-world supply and demand.",
      image: "/images/minecraftplugin_cover.jpg",
      technologies: ["Java", "Bukkit API"],
      githubUrl: "https://github.com/ereilly89/reilly-economy-minecraft-plugin",
      //liveUrl: "#",
    },
    {
      id: 6,
      title: "UWW CompSci Alumni App",
      description: "Web application showcasing data visualizations of UW Whitewater graduate statistics.",
      image: "/images/uwwalumni_cover.png",
      technologies: ["Java", "JavaScript", "MySQL", "Python", "Google Maps API"],
      githubUrl: "https://github.com/ereilly89/uww-alumni-web-app",
      //liveUrl: "#",
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
                  {project.githubUrl ?
                  <button
                    onClick={() => handleLinkClick(project.githubUrl)}
                    className="flex items-center text-primary hover:text-accent font-medium transition-colors duration-300"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </button>
                  :null}
                  {
                    project.liveUrl ? <button
                                        onClick={() => handleLinkClick(project.liveUrl)}
                                        className="flex items-center text-primary hover:text-accent font-medium transition-colors duration-300"
                                      >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                            Live Demo
                                        
                                      </button> : (project.thesisUrl ? <button
                                                                          onClick={() => handleLinkClick(project.thesisUrl)}
                                                                          className="flex items-center text-primary hover:text-accent font-medium transition-colors duration-300"
                                                                        >
                                                                          <ExternalLink className="w-4 h-4 mr-2" />
                                                                              Thesis
                                                                        </button>: null)
                  }
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
