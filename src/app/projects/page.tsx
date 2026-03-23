import type { Metadata } from "next";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Atul Kodla.",
};

export default function Projects() {
  return <ProjectsGrid />;
}
