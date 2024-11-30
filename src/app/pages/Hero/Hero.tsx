"use client";

import { useState, useEffect, useRef } from "react";

import * as THREE from "three";

import NET from "vanta/dist/vanta.net.min";

import "./Hero.css";

export default function Hero() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x787676,
          backgroundColor: 0x13295c,
          points: 20.0,
          maxDistance: 22.0,
          showDots: false,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section id="hero" ref={myRef}>
      <div className="absolute flex flex-col justify-center w-[600px]">
        <p className="text-xl">Hi, my name is</p>
        <b className="text-8xl">Atul Kodla</b>
        <p className="text-3xl">
          I'm a penultimate Software Engineering student at the&nbsp;
          <a
            href="https://www.auckland.ac.nz/en.html"
            target="_blank"
            className="underline"
          >
            University of Auckland
          </a>
        </p>
      </div>
    </section>
  );
}
