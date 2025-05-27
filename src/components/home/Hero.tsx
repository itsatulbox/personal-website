"use client";

export default function Hero() {
  return (
    <section id="hero">
      <div className="absolute top-15 inset-0 flex flex-col">
        <h1 className="text-center font-bold m-0 p-0 leading-none text-[15vw]">
          ATUL KODLA
        </h1>
        <div className="flex flex-col h-full w-[50%] ml-auto justify-around">
          <p className="text-xl">
            Hello! I'm a penultimate year Software Engineering student at
            the&nbsp;
            <a
              href="https://www.auckland.ac.nz/en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              University of Auckland
            </a>
          </p>
          <div className="flex flex-row gap-6">
            <a
              href="https://www.linkedin.com/in/atulkodla/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/itsatulbox"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </a>
            <a href="https://leetcode.com/u/atulbox/" className="underline">
              LeetCode
            </a>
            <a
              href="/AtulKodlaCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Resumé
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
