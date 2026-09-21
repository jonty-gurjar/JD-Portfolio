import TagSphere from "@/components/ui/TagSphere";

const techTags = [
    "React.js",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Framer Motion",
    "Node.js",
    "Express.js",
    "REST API",
    "MongoDB",
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
    "DOM",
    "Async / Await",
    "ES6+",
    "Accessibility",
];

export default function TagSphereDemo() {
  return (
    <div className="w-full flex items-center justify-center p-8 bg-black/40 rounded-2xl border border-white/10">
      <TagSphere
        tags={techTags}
        radius={180}
        height={480}
        accentColor="#ff4d2e"
        maxFontSize={24}
        minFontSize={12}
      />
    </div>
  );
}
