import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
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
      href: "#contact",
      icon: Mail,
      label: "Email Contact",
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg mb-2">
            &copy; 2025 Evan Reilly. All rights reserved.
          </p>
          <p className="text-gray-400 mb-6">
          </p>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSocialClick(link.href)}
                  className="w-12 h-12 rounded-full bg-gray-800 hover:bg-primary text-gray-400 hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
                  aria-label={link.label}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
