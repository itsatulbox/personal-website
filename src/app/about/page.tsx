"use client";

export default function About() {
  return (
    <div className="flex flex-col pt-20 pb-10 gap-5 w-screen min-h-screen items-center justify-center px-5">
      <h2 className="text-3xl font-bold">About Me</h2>
      <p className="leading-relaxed max-w-3xl">
        I’m Atul and I am currently an undergraduate student in my penultimate
        year of a Bachelor of Engineering (Honours) degree specialising in
        Software Engineering at the University of Auckland. At university, I am
        trying my best to build a solid foundation in software development. So
        far I have worked on frontend development using React and backend
        systems with Python and Java. I have also worked on iOS development
        using Swift and SwiftUI during my time at Alimetry! Recently, I’ve been
        motivated to do the daily LeetCode and so a blog about my non-optimal
        approaches to these problems will be out soon (inspired by&nbsp;
        <a
          href="https://ericzheng.nz/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Eric Zheng
        </a>
        &nbsp;and&nbsp;
        <a
          href="https://koutaroyumiba.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Koutaro Yumiba
        </a>
        ).
        <br />
        <br />
        Outside of my studies, I climb (boulder) religiously and work on my car
        (an imolarot2 BMW E46 330i 😎) when it has problems 😔 (currently
        problem free!! 🥳).
      </p>
    </div>
  );
}
