import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero">
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
