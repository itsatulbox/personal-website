import type { Metadata } from "next";
import Image, { StaticImageData } from "next/image";
import guessWho1 from "@/assets/guessWho1.webp";
import guessWho2 from "@/assets/guessWho2.webp";
import guessWho3 from "@/assets/guessWho3.webp";
import guessWho4 from "@/assets/guessWho4.webp";
import finger1 from "@/assets/finger1.webp";
import finger2 from "@/assets/finger2.webp";
import finger3 from "@/assets/finger3.webp";
import finger4 from "@/assets/finger4.webp";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Atul Kodla — including a JavaFX game with OpenAI-driven NPC dialogue and a multi-model sign language interpreter built with ResNet, AlexNet, and EfficientNet.",
};

type ProjectCardProps = {
  images: StaticImageData[];
  title: string;
  tech: string;
  description: string;
};

function ProjectCard({ images, title, tech, description }: ProjectCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, i) => (
          <div key={i} className="relative w-[40vw] md:w-[20vw] aspect-5/3">
            <Image
              src={img}
              alt={`${title} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 40vw, 20vw"
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xl font-bold">{title}</p>
      <p className="font-semibold text-center">{tech}</p>
      <p className="md:w-[40vw]">{description}</p>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="flex flex-col pt-20 pb-10 gap-5 w-full min-h-screen items-center justify-center px-5">
      <h2 className="text-3xl font-bold">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProjectCard
          images={[guessWho1, guessWho2, guessWho3, guessWho4]}
          title="Jewel Heist"
          tech="Java, JavaFX, Git, GitHub, OpenAI"
          description="A Guess Who Style game developed for the course SOFTENG206. The game was built with Java and JavaFX and incorporates the OpenAI api to create interactive characters. The user has 5 minutes to guess the thief after playing through 3 minigames and interacting with the suspects."
        />
        <ProjectCard
          images={[finger1, finger2, finger3, finger4]}
          title="Sign Language Interpreter"
          tech="Python, PyQT5, Git, GitHub"
          description="A sign language translator project developed for the course COMPSYS302. This app was built using Python and PyQT Designer with PyQT5. It uses three machine learning models (a custom ResNet, AlexNet and EfficientNet) and uses a platform where you can train these models with inputted data and make predictions with saved models."
        />
      </div>
    </div>
  );
}
