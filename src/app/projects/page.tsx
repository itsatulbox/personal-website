import Image, { StaticImageData } from "next/image";
import guessWho1 from "@/assets/guessWho1.png";
import guessWho2 from "@/assets/guessWho2.png";
import guessWho3 from "@/assets/guessWho3.png";
import guessWho4 from "@/assets/guessWho4.png";
import finger1 from "@/assets/finger1.png";
import finger2 from "@/assets/finger2.png";
import finger3 from "@/assets/finger3.png";
import finger4 from "@/assets/finger4.png";

export default function Projects() {
  type ProjectCardProps = {
    images: StaticImageData[];
    title: string;
    tech: string;
    description: string;
  };

  const ProjectCard = ({
    images,
    title,
    tech,
    description,
  }: ProjectCardProps) => {
    return (
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative w-[20vw] aspect-[5/3]">
              <Image
                src={img}
                alt={`Project image ${i}`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xl font-bold">{title}</p>
        <p className="font-semibold">{tech}</p>
        <p className="w-[40vw]">{description}</p>
      </div>
    );
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center p-12">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-12">
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
