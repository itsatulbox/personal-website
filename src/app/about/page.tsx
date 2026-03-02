import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Atul Kodla.",
};

export default function About() {
  return (
    <div className="flex flex-col pt-20 pb-10 gap-5 w-full min-h-screen items-center justify-center px-5">
      <h2 className="text-3xl font-bold">About Me</h2>
      <div className="leading-relaxed max-w-3xl space-y-4">
        <p>
          I’m Atul, a final year Software Engineering student at the University
          of Auckland with a strong interest in systems engineering and trading
          technology.
        </p>
        <p>
          I currently work part-time at a proprietary trading firm, where I have
          built high-throughput market data pipelines. Alongside this, I’ve
          worked across frontend, backend, and mobile development, building
          applications using React, Python, Java, and Swift.
        </p>
        <p>
          Outside of engineering, I climb regularly and spend time working on my
          imolarot2 BMW E46 330i 🚗 (currently not running problem-free 😢).
        </p>
      </div>
    </div>
  );
}
