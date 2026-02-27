import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Atul Kodla — Software Engineering student at the University of Auckland.",
};

export default function About() {
  return (
    <div className="flex flex-col pt-20 pb-10 gap-5 w-full min-h-screen items-center justify-center px-5">
      <h2 className="text-3xl font-bold">About Me</h2>
      <div className="leading-relaxed max-w-3xl space-y-4">
        <p>
          I&apos;m Atul and I am currently an undergraduate student in my
          penultimate year of a Bachelor of Engineering (Honours) degree
          specialising in Software Engineering at the University of Auckland. At
          university, I am building a solid foundation in software development
          through projects via the clubs I am a part of and through the courses
          I have enrolled in.
        </p>
        <p>
          So far I have worked on frontend development using React and backend
          systems with Python and Java. I have also worked on iOS development
          using Swift and SwiftUI during my time at Alimetry! Recently,
          I&apos;ve been motivated to do the daily LeetCode and so a blog about
          my non-optimal approaches to these problems will be out soon.
        </p>
        <p>
          Outside of my studies, I climb religiously and work on my car (an
          imolarot2 BMW E46 330i 🚗) when it has problems (currently problem
          free!!).
        </p>
      </div>
    </div>
  );
}
