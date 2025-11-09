export default function About() {
  const skills = [
    "Kubernetes",
    "OpenShift",
    "Python",
    "Java",
    "Golang",
    "Bash",
    "React",
    "Node.js",
    "MySQL",
    "MongoDB",
    "Node.js",
    "Docker",
    "Git",
    "IBM Cloud (IKS & ROKS)",
    "Ansible",
    "Jenkins",
    "AWS",
    "Django",
    "Scikit",
    "TensorFlow",
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="/images/profile.png"
              alt="Evan Reilly - Professional headshot"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">
              Hey, I'm Evan!
            </h3>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>I’m a Software Engineer at IBM with a background in distributed sytems, machine learning, and SaaS development.</p>

              <p>I'm passionate about building scalable solutions and streamlining complex workflows to make life and business more efficient.</p>

              <p>I graduated <i>Summa Cum Laude</i> with an M.S. degree in Computer Science and a B.S. in Computer Science & Economics from the University of Wisconsin - Whitewater.</p>
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
