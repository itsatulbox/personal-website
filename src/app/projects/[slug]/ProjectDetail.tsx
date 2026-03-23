"use client";

import { lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../data";

const BlackjackTerminal = lazy(
  () => import("@/components/BlackjackTerminal")
);

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="flex flex-col pt-20 pb-10 w-full min-h-screen items-center px-5">
      <div className="w-full max-w-5xl">
        <Link
          href="/projects"
          className="text-sm opacity-60 hover:opacity-100 transition-opacity mb-6 inline-block"
        >
          &larr; Back to projects
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">{project.title}</h1>

        <div className="space-y-10">
          {project.interactive === "blackjack" && (
            <>
              <div className="hidden md:block w-full h-[60vh] rounded-lg overflow-hidden">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center bg-black text-white">
                      Loading terminal...
                    </div>
                  }
                >
                  <BlackjackTerminal />
                </Suspense>
              </div>
              <div className="md:hidden">
                {project.mobileImage && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <Image
                      src={project.mobileImage}
                      alt={`${project.title} preview`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-sm opacity-60 mt-3">
                  Switch to desktop to play!
                </p>
              </div>
            </>
          )}

          {project.images.length > 0 && (
            <div
              className={
                project.images.length === 1 ? "" : "grid grid-cols-2 gap-4"
              }
            >
              {project.images.map((img, i) => (
                <div key={i} className="relative aspect-5/3">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes={
                      project.images.length === 1
                        ? "(max-width: 768px) 100vw, 80vw"
                        : "(max-width: 768px) 50vw, 40vw"
                    }
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <h4 className="font-bold text-lg mb-3 pb-2 border-b border-neutral-300 dark:border-neutral-700">
              Description
            </h4>
            <p className="opacity-80 leading-relaxed">{project.description}</p>
          </div>

          {project.links && project.links.length > 0 && (
            <div>
              <h4 className="font-bold text-lg mb-3 pb-2 border-b border-neutral-300 dark:border-neutral-700">
                Links
              </h4>
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-70"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
