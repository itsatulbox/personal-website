"use client";

import { useEffect, useState } from "react";

const messages: string[] = [
  "I'm a part 4 SWE student at the University of Auckland",
  "I'm probably climbing right now",
  "I'm wondering what to eat",
];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export default function ScrambleText() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [message, setMessage] = useState(() =>
    messages[0]
      .split("")
      .map((char) =>
        char === " " ? " " : letters.charAt(Math.floor(Math.random() * letters.length))
      )
      .join("")
  );

  useEffect(() => {
    let iterations = 0;
    let pauseTimeout: ReturnType<typeof setTimeout>;
    const target = messages[messageIndex];
    const scrambleInterval = setInterval(() => {
      const newMessage = target
        .split("")
        .map((char, index) => {
          if (char === " " || index < iterations) return char;
          return letters.charAt(Math.floor(Math.random() * letters.length));
        })
        .join("");

      setMessage(newMessage);

      iterations += 1 / 3;

      if (iterations >= target.length) {
        clearInterval(scrambleInterval);
        pauseTimeout = setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 7500);
      }
    }, 15);

    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(pauseTimeout);
    };
  }, [messageIndex]);

  return (
    <p className="text-xl h-[7.5rem] md:h-[5.5rem]" suppressHydrationWarning>
      Hello!
      <br />
      I&apos;m Atul and {message}
    </p>
  );
}
