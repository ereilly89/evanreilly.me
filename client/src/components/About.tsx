export default function About() {
  const skills = [
    "Kubernetes",
    "Python",
    "Java",
    "JavaScript",
    "React",
    "Node.js",
    "Golang",
    "Git",
    "Bash",
    "Jenkins",
    "MongoDB",
    "MySQL",
    "AWS",
    "IBM Cloud",
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
              src="/images/profile.png"
              alt="Evan Reilly - Professional headshot"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-semibold mb-6 text-gray-900">
              Hi, I'm Evan Reilly
            </h3>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
              Software engineer passionate about building scalable, cloud-native applications and automation. At IBM Cloud, I work on the IKS and ROKS team, delivering production-grade Kubernetes and OpenShift to enterprise clients.
              </p>

              <p>
              My experience spans software architecture and design, from front-end development to backend development including database and API design, deployment, infrastructure automation, developer tooling, operations, and support — with a focus on automating complex systems and creating intuitive, reliable solutions.
              </p>

              <p>
              Outside of work, I enjoy shipping software from discord bots to full-stack SaaS applications and hosting a variety of servers. I'm currently exploring opportunities to build impactful software, work with modern cloud and AI technologies, and contribute to high-performing engineering teams.
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
