"use client";

import { ReactNode } from "react";

export default function NavBar() {
  const handleLinkClick = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.slice(2);
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const NavMenu = ({ children }: { children: ReactNode }) => (
    <ul className="fixed z-10 flex flex-row w-full items-center justify-between">
      {children}
    </ul>
  );

  const NavList = ({ children }: { children: ReactNode }) => (
    <ul className="flex items-center p-10">{children}</ul>
  );

  const NavItem = ({
    link,
    children,
  }: {
    link?: string;
    children: ReactNode;
  }) => (
    <li>
      {link ? (
        <a
          href={link}
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (link.startsWith("/#")) {
              e.preventDefault(); // Prevent default anchor behavior
              handleLinkClick(link); // Call the scroll function
            }
          }}
          className="p-5"
        >
          {children}
        </a>
      ) : (
        <span className="cursor-default">{children}</span>
      )}
    </li>
  );

  return (
    <NavMenu>
      <NavList>
        <NavItem link="/#hero">Atul Kodla</NavItem>
        <NavItem link="/#about">About</NavItem>
        <NavItem link="/#projects">Projects</NavItem>
      </NavList>
      <NavList>
        <NavItem link="https://www.linkedin.com/in/atulkodla/">
          LinkedIn
        </NavItem>
        <NavItem link="https://github.com/itsatulbox">Github</NavItem>
      </NavList>
    </NavMenu>
  );
}
