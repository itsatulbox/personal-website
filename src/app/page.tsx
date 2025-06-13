"use client";

import { useEffect, useState } from "react";

export default function Index() {
  const about: string[] = [
    "I'm a student at the University of Auckland",
    "I'm an aspiring Software Engineer",
    "I'm probably climbing right now",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [message, setMessage] = useState("");

  const letters = "ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    let iterations = 0;
    const target = about[messageIndex];
    const scrambleInterval = setInterval(() => {
      const newMessage = target
        .split("")
        .map((char, index) => {
          if (index < iterations) return char;
          return letters.charAt(Math.floor(Math.random() * letters.length));
        })
        .join("");

      setMessage(newMessage);

      iterations += 1 / 3;

      if (iterations >= target.length) {
        clearInterval(scrambleInterval);
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % about.length);
        }, 7500);
      }
    }, 25);

    return () => clearInterval(scrambleInterval);
  }, [messageIndex]);

  return (
    <div className="flex flex-col gap-20 md:gap-0 pt-20 md:pt-24 px-5">
      <h1 className="text-center font-bold m-0 p-0 leading-none text-[14vw] md:text-[15vw]">
        ATUL KODLA
      </h1>
      <div className="flex flex-col h-full md:w-[50%] gap-10 md:gap-20 ml-auto justify-around">
        <p className="text-xl">
          Hello!
          <br />
          I'm Atul and {message}
        </p>
        <div>
          <p>External Links:</p>
          <div className="flex flex-row gap-6 flex-wrap">
            <a
              href="https://www.linkedin.com/in/atulkodla/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
            <a
              href="/AtulKodlaCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
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
  );
}
