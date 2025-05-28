"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <nav className="flex items-center fixed w-full justify-between z-10 px-5 lg:px-8 xl:px-[8%] py-4">
        <Link
          href="/"
          className="bg-offShade text-[1.25rem] font-ibm py-1 px-3 m-2 rounded-lg"
        >
          ~$ ak
        </Link>
        <ul className="hidden md:flex gap-6 lg:gap-8 justify-evenly">
          <li>
            <Link href="/" className="bg-offShade p-2 m-3 rounded-lg">
              home
            </Link>
          </li>
          <li>
            <Link href="/about" className="bg-offShade p-2 m-3 rounded-lg">
              about me
            </Link>
          </li>
          <li>
            <Link href="/projects" className="bg-offShade p-2 m-3 rounded-lg">
              projects
            </Link>
          </li>
          <li>
            <Link href="/leetcode" className="bg-offShade p-2 m-3 rounded-lg">
              leetcode
            </Link>
          </li>
        </ul>
        <div className="flex">
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="bg-offShade p-2 m-3 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 284.8 12.7 11.2"
              width="24"
              height="24"
              fill="currentColor"
              stroke="none"
              className="block"
            >
              <path d="M6.19258 284.83128 A5.81474 5.81474 0 0 0 0.5352 290.65599 A5.81482 5.81482 0 1 0 12.16485 290.65599 A5.81474 5.81474 0 0 0 6.19258 284.83128 Z M6.35004 285.36998 V295.94199 A5.28621 5.28621 0 0 1 6.35004 285.36998 Z" />
            </svg>
          </button>
          <button
            onClick={() => setMenuVisible(true)}
            className="flex md:hidden bg-offShade p-2 m-3 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
            </svg>
          </button>
          {menuVisible && (
            <div>
              <ul className="flex md:hidden flex-col gap-4 py-20 px-4 fixed right-0 top-0 bottom-0 w-40 z-10 bg-offShade transition duration-100">
                <div
                  onClick={() => setMenuVisible(false)}
                  className="fixed right-6 top-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="24px"
                    height="24px"
                  >
                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
                  </svg>
                </div>
                <li>
                  <Link
                    onClick={() => setMenuVisible(false)}
                    href="/"
                    className="bg-offShade p-2 m-3 rounded-lg"
                  >
                    home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenuVisible(false)}
                    href="/about"
                    className="bg-offShade p-2 m-3 rounded-lg"
                  >
                    about me
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenuVisible(false)}
                    href="/projects"
                    className="bg-offShade p-2 m-3 rounded-lg"
                  >
                    projects
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setMenuVisible(false)}
                    href="/leetcode"
                    className="bg-offShade p-2 m-3 rounded-lg"
                  >
                    leetcode
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
