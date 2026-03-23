import Link from "next/link";
import { projects } from "./data";

export default function ProjectsGrid() {
  return (
    <div className="flex flex-col pt-20 pb-10 w-full min-h-screen items-center px-5">
      <h2 className="text-3xl font-bold mb-10">Projects</h2>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group w-full text-left bg-offShade rounded-lg p-6 md:p-8 transition-all hover:scale-[1.01] cursor-pointer outline-none focus:outline-none"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              {project.title}
            </h3>
            <p className="text-sm opacity-60 mb-4">{project.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-background opacity-70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
