import Image from "next/image";
import highball from "@/assets/highball.webp";
import ScrambleText from "@/components/home/scrambletext";

export default function Index() {
  return (
    <div className="flex flex-col h-dvh pt-20 md:pt-24 pb-8 px-5">
      <h1 className="text-center font-bold m-0 p-0 leading-none text-[14vw] md:text-[15vw]">
        ATUL KODLA
      </h1>
      <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-4 md:gap-12 mt-4 md:mt-0 px-5 md:justify-between">
        {/* Left — photo */}
        <div className="relative flex-1 min-h-0 md:flex-none md:w-1/2 md:min-h-[50vh] overflow-hidden rounded-xl">
          <Image
            src={highball}
            alt="Atul on a highball"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {/* Right — scramble text + links */}
        <div className="shrink-0 flex flex-col md:flex-1 md:w-1/2 gap-8 md:gap-20 justify-between py-2">
          <ScrambleText />
          <div>
            <p>External Links:</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="https://www.linkedin.com/in/atulkodla/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                LinkedIn
              </a>
              <a href="/AtulKodlaCV.pdf" target="_blank" className="underline">
                Resumé
              </a>
              <a
                href="https://github.com/itsatulbox"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>
              <a
                href="https://leetcode.com/u/atulbox/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                LeetCode
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
