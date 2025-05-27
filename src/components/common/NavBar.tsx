"use client";

import { useEffect, useState } from "react";

export default function NavBar() {
  type NavItemProps = {
    href: string;
    children: React.ReactNode;
  };

  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
  }, [isLight]);

  const NavItem = ({ href, children }: NavItemProps) => {
    const isExternal = href.includes("https://");

    return (
      <a
        href={href}
        className="bg-offShade text-[1rem] p-2 m-3 rounded-lg"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  };

  return (
    <div className="fixed flex flex-row w-full justify-between z-10 px-10">
      <NavItem href="/">A_K.</NavItem>
      <div className="flex flex-row justify-evenly">
        <NavItem href="/">home</NavItem>
        <NavItem href="/about">about me</NavItem>
        <NavItem href="/projects">projects</NavItem>
        <NavItem href="/leetcode">leetcode</NavItem>
      </div>
      <button
        onClick={() => setIsLight(!isLight)}
        className="bg-offShade p-2 m-3 rounded-md flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 284.8 12.7 11.2"
          width="24"
          height="24"
          fill={isLight ? "#000000" : "#ffffff"}
          stroke="none"
          className="block"
        >
          <path d="M6.19258 284.83128 A5.81474 5.81474 0 0 0 0.5352 290.65599 A5.81482 5.81482 0 1 0 12.16485 290.65599 A5.81474 5.81474 0 0 0 6.19258 284.83128 Z M6.35004 285.36998 V295.94199 A5.28621 5.28621 0 0 1 6.35004 285.36998 Z" />
        </svg>
      </button>
    </div>
  );
}
