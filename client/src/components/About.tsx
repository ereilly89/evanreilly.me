export default function About() {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800"
              alt="Evan Reilly - Professional headshot"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">
              Hello! I'm Evan Reilly
            </h3>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                I'm a passionate Full Stack Developer with over 5 years of experience creating web applications that make a difference. 
                My journey started with a curiosity for how things work on the web, and it has evolved into a love for building 
                scalable, user-friendly applications.
              </p>
              
              <p>
                I specialize in JavaScript technologies, with expertise in React, Node.js, and modern web development practices. 
                I believe in writing clean, maintainable code and creating exceptional user experiences that solve real-world problems.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or enjoying the great outdoors with my camera in hand.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">
                Core Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
