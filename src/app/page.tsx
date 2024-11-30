import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";

export default function Index() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Projects />
    </div>
  );
}
