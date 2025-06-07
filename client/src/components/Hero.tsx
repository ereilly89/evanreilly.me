import { Github, Linkedin, Mail, ArrowDown, ChevronDown } from "lucide-react";

export default function Hero() {
  const socialLinks = [
    {
      href: "https://github.com/ereilly89",
      icon: Github,
      label: "GitHub Profile",
    },
    {
      href: "https://www.linkedin.com/in/evan-reilly/",
      icon: Linkedin,
      label: "LinkedIn Profile",
    },
    {
      href: "mailto:evan@evanreilly.me",
      icon: Mail,
      label: "Email Contact",
    },
    {
      href: "#about",
      icon: ArrowDown,
      label: "Learn More",
    },
  ];

  const handleSocialClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    } else {
      window.open(href, "_blank", "noopener noreferrer");
    }
  };

  return (
    <section id="home" className="min-h-screen hero-gradient flex items-center relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
            Evan Reilly
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4 animate-fadeInUp [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
            Full Stack Developer & Creative Problem Solver
          </p>
          <p className="text-lg md:text-xl mb-8 text-white/90 animate-fadeInUp [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
            Crafting digital experiences with modern technologies and innovative solutions
          </p>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6 animate-fadeInUp [animation-delay:0.6s] opacity-0 [animation-fill-mode:forwards]">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSocialClick(link.href)}
                  className="social-icon"
                  aria-label={link.label}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-slow">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
