"use client";

import TagSphere from "@/components/ui/TagSphere";

const techTags = [
   "React.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Framer Motion",
    "Next.js",
    "Express.js",
    "REST API",
    "MongoDB",
    "Python",
    "C++",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "Git",
    "GitHub",
    "VS Code",
    "Vite",
    "NPM",
    "Figma",
    "Vercel",
    "Responsive Design",
    "Component Architecture",
    "API Integration",
    "State Management",
    "DSA",
    "Async / Await",
    "ES6+",
    "Accessibility",
];

export default function TagSphereDemo() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-neutral-900 px-4 max-[1025px]:h-auto max-[1025px]:py-16">
      <div className="space-y-3 text-center">
        <h2 className="font-mono text-[4vw] capitalize text-white max-[1025px]:text-4xl">
          Tech Stack 3D Cloud
        </h2>
        <p className="font-mono text-sm text-white/50">Drag or use arrow keys to rotate the sphere</p>
      </div>

      <TagSphere tags={techTags} radius={180} height={450} accentColor="#ff4d2e" />
    </div>
  );
}
