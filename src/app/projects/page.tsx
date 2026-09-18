import type { Metadata } from "next";
import ProjectsGrid from "./ProjectsGrid";
import { NO_INDEX } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Atul Kodla.",
  robots: NO_INDEX,
};

export default function Projects() {
  return <ProjectsGrid />;
}
