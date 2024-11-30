"use client";

import { useState, useEffect, useRef } from "react";

import * as THREE from "three";

import WAVES from "vanta/dist/vanta.waves.min";

import "./About.css";

export default function About() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          THREE,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section id="about" ref={myRef}>
      <div className="about-container">
        <b>About Me</b>
        <h1>
          I’m currently in my penultimate year of Software Engineering, building
          a solid foundation in software development. I focus on frontend
          technologies like React and backend systems with Python and Java. I’m
          passionate about writing clean, efficient, and maintainable code, and
          I’m always looking to learn more about new frameworks, tools, and best
          practices. Outside of my studies, I enjoy bouldering and working on my
          car.
        </h1>
      </div>
    </section>
  );
}
