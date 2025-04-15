"use client";
import { useState, useEffect } from "react";
import { User, Mail, FileText, Github, Linkedin, Twitter } from "lucide-react";

import { X } from "lucide-react";

interface AppContentProps {
  appId: string;
}

export function AppContent({ appId }: AppContentProps) {
  switch (appId) {
    case "about":
      return <AboutContent />;
    case "projects":
      return <ProjectsContent />;
    case "skills":
      return <SkillsContent />;
    case "contact":
      return <ContactContent />;
    case "resume":
      return <ResumeContent />;
    default:
      return <div>App not found</div>;
  }
}

function AboutContent() {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="space-y-6 border p-10 sm:w-1/2 w-[22rem] rounded-md">
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
          <div className="h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 shadow-xl transform transition-all duration-300 hover:scale-105">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Rabin Bhattarai
            </h1>
            <p className="text-xl font-medium text-gray-600">
              Full Stack Developer
            </p>
            <div className="mt-4 flex justify-center sm:justify-start space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="transition-transform transform hover:scale-110"
                onClick={() => window.open("https://github.com/Rabinbhatta")}
              >
                <Github className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="transition-transform transform hover:scale-110"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/rabin-bhattarai-95276724a/"
                  )
                }
              >
                <Linkedin className="h-5 w-5 text-gray-700 hover:text-gray-900" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            I'm a passionate full-stack developer with 1 years of experience in
            building dynamic and responsive web applications. I specialize in
            React, Next.js, and Node.js, constantly exploring new technologies
            to keep up with the fast-paced tech landscape. My focus is on
            delivering high-quality solutions while ensuring seamless user
            experiences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsContent() {
  const [selectedLink, setSelectedLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      title: "E-commerce Platform (Khadbari)",
      description:
        "I built this real-world project as a backend developer, implementing core business logic and APIs, and also developed the admin panel using frontend technologies.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
      ],
      image: "/rudrakshya.png?height=200&width=300",
      link: "https://www.khandbarirudraksha.com/",
    },
    {
      title: "Real-time Chat Application",
      description:
        "A real-time chat application with socket.io for instant messaging",
      technologies: ["React", "Nodejs", "Socket.io"],
      image: "/message.png?height=200&width=300",
      link: "https://messaging-frontend-nine.vercel.app/",
    },
    {
      title: "Multi-palyer Combat Game",
      description:
        "A multiplayer combat game built with javascript and HTML5 canvas",
      technologies: ["JavaScript", "HTML5", "CSS3"],
      image: "/game.png?height=200&width=300",
      link: "https://rabinjsgame.netlify.app/",
    },
  ];

  const handleProjectClick = (project: any) => {
    const isKhadbari = project.title.includes("Khadbari");
    if (isMobile && !isKhadbari) {
      window.open(project.link, "_blank");
    } else {
      setSelectedLink(project.link);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">My Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-gray-600">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for desktop or khadbari */}
      {selectedLink && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 -top-8">
          {selectedLink.includes("messaging-frontend") ? (
            <div className="flex gap-4 w-full max-w-[100%] h-[100%]">
              <div className="flex flex-col w-1/2 h-full bg-white rounded-lg overflow-hidden shadow-lg border">
                <div className="flex items-center justify-between bg-gray-800 px-3 py-2 text-white text-sm">
                  <div>Chat App - Window 1</div>
                  <button
                    onClick={() => setSelectedLink("")}
                    className="hover:bg-red-600 rounded p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <iframe
                  src={selectedLink}
                  title="Chat App Window 1"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col w-1/2 h-full bg-white rounded-lg overflow-hidden shadow-lg border">
                <div className="flex items-center justify-between bg-gray-800 px-3 py-2 text-white text-sm">
                  <div>Chat App - Window 2</div>
                  <button
                    onClick={() => setSelectedLink("")}
                    className="hover:bg-red-600 rounded p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <iframe
                  src={selectedLink}
                  title="Chat App Window 2"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-white">
                <div className="text-sm font-medium">Project Preview</div>
                <button
                  className="hover:bg-red-700 rounded-sm p-1"
                  onClick={() => setSelectedLink("")}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
              <iframe
                src={selectedLink}
                title="Project Preview"
                className="flex-grow w-full"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SkillsContent() {
  const skills = [
    { name: "JavaScript", image: "/javascript.png" },
    { name: "TypeScript", image: "/typescript.png" },
    { name: "React", image: "/react.png" },
    { name: "Next.js", image: "/next.jpg" },
    { name: "Node.js", image: "/nodejs.png" },
    { name: "HTML", image: "/html.png" },
    { name: "Tailwind CSS", image: "/tailwind.jpg" },
    { name: "CSS", image: "/css.png" },
    { name: "Mongodb", image: "/mongodb.png" },
    { name: "REST API", image: "/restapi.png" },
    { name: "Typescript", image: "/typescript.png" },
    { name: "PostgreSQL", image: "/postgresql.png" },
    { name: "Express.js", image: "/expressjs.png" },
    { name: "Git", image: "/git.png" },
    { name: "GraphQL", image: "/graphql.png" },
    { name: "Prisma", image: "/prisma.png" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>
      <div className="ml-2 grid space-y-3 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {skills.map((skill, index) => (
          <div key={index} className="">
            <div className="flex flex-col gap-2 items-center justify-center rounded-lg border p-4">
              <img
                src={skill.image || "/placeholder.svg"}
                alt={skill.name}
                className="w-32 h-32 rounded object-cover"
              />
              <span className="text-xl">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";
import { useRef } from "react";

export function ContactContent() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Contact Me</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-600" />
          <span>rabinbhattarai646@gmail.com</span>
        </div>
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-600" />
          <span>@rabinbhattarai</span>
        </div>
      </div>

      <form ref={form} onSubmit={(e) => sendEmail(e)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="reply_to"
              type="email"
              required
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Your email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="h-32 w-full rounded-md border border-gray-300 p-2"
            placeholder="Your message"
          ></textarea>
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}

function ResumeContent() {
  const experience = [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      period: "2021 - Present",
      description:
        "Leading the frontend development team, implementing new features, and optimizing performance.",
    },
    {
      company: "Digital Solutions LLC",
      position: "Full Stack Developer",
      period: "2018 - 2021",
      description:
        "Developed and maintained web applications using React, Node.js, and MongoDB.",
    },
    {
      company: "WebCraft Agency",
      position: "Junior Developer",
      period: "2016 - 2018",
      description:
        "Assisted in the development of client websites and learned various web technologies.",
    },
  ];

  const education = [
    {
      institution: "University of Technology",
      degree: "Master of Computer Science",
      period: "2014 - 2016",
    },
    {
      institution: "State College",
      degree: "Bachelor of Science in Web Development",
      period: "2010 - 2014",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Resume</h2>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Experience</h3>
        <div className="space-y-4">
          {experience.map((job, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="flex flex-wrap justify-between">
                <h4 className="font-semibold">{job.position}</h4>
                <span className="text-sm text-gray-600">{job.period}</span>
              </div>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="mt-2 text-sm">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Education</h3>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="flex flex-wrap justify-between">
                <h4 className="font-semibold">{edu.degree}</h4>
                <span className="text-sm text-gray-600">{edu.period}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
