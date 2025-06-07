import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Resume() {
  const { toast } = useToast();

  const handleResumeDownload = () => {
    // In a real implementation, this would link to the actual PDF
    toast({
      title: "Resume Download",
      description: "Resume download feature will be implemented with actual PDF file.",
      variant: "default",
    });
    
    // Example of how it would work with a real file:
    window.open('/assets/Resume_Reilly_SoftwareEngineer.pdf', '_blank');
  };

  return (
    <section id="resume" className="section-padding hero-gradient">
      <div className="container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-white">Resume</h2>
          
          <p className="text-xl mb-8 leading-relaxed text-white/90">
            Interested in learning more about my experience and qualifications? 
            Download my complete resume to see my professional journey, skills, and achievements.
          </p>
          
          <button
            onClick={handleResumeDownload}
            className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-2xl"
          >
            <Download className="w-5 h-5 mr-3" />
            Download Resume
          </button>
          
          <p className="mt-4 text-sm text-white/80">
            PDF • Last updated June 2025
          </p>
        </div>
      </div>
    </section>
  );
}
