import { StaticImageData } from "next/image";
import guessWho1 from "@/assets/guessWho1.webp";
import guessWho2 from "@/assets/guessWho2.webp";
import guessWho3 from "@/assets/guessWho3.webp";
import guessWho4 from "@/assets/guessWho4.webp";
import finger1 from "@/assets/finger1.webp";
import finger2 from "@/assets/finger2.webp";
import finger3 from "@/assets/finger3.webp";
import finger4 from "@/assets/finger4.webp";
import blackjack from "@/assets/blackjack.webp";
import hiddenTreasure from "@/assets/hiddenTreasure.webp";
import jemberry1 from "@/assets/jemberry1.webp";
import jemberry2 from "@/assets/jemberry2.webp";
import jemberry3 from "@/assets/jemberry3.webp";
import jemberry4 from "@/assets/jemberry4.webp";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  images: StaticImageData[];
  links?: { label: string; url: string }[];
  interactive?: "blackjack";
  mobileImage?: StaticImageData;
};

export const projects: Project[] = [
  {
    slug: "blackjack",
    title: "Blackjack",
    summary: "A terminal based Blackjack game written in C++. Play it here.",
    description:
      "A terminal based Blackjack game written in C++. Play it directly in the browser.",
    tags: ["C++", "DOCKER", "TRY IT NOW"],
    images: [],
    links: [
      { label: "GitHub", url: "https://github.com/itsatulbox/blackjack" },
    ],
    interactive: "blackjack",
    mobileImage: blackjack,
  },
  {
    slug: "jemberry",
    title: "Jemberry",
    summary:
      "An e-commerce website for a small business selling handmade clay trinkets.",
    description:
      "An e-commerce website built for a friend who sells handmade clay trinkets. Features product browsing, a shopping cart, and Stripe checkout integration. Built with Next.js, Supabase, TypeScript and Stripe.",
    tags: ["NEXT.JS", "TYPESCRIPT", "SUPABASE", "STRIPE"],
    images: [jemberry1, jemberry2, jemberry3, jemberry4],
    links: [
      { label: "Website", url: "https://jemberry.studio" },
      { label: "GitHub", url: "https://github.com/itsatulbox/jemberry" },
    ],
  },
  {
    slug: "hidden-treasure",
    title: "Hidden Treasure",
    summary: "Website built for the charity Hidden Treasure.",
    description:
      "A website built for the charity Hidden Treasure. Led a team of developers to build a scalable and user friendly site. Built with Payload CMS, Next.js, TypeScript, MongoDB and AWS.",
    tags: ["PAYLOAD CMS", "TYPESCRIPT", "MONGODB", "AWS", "GIT"],
    images: [hiddenTreasure],
    links: [
      { label: "Website", url: "https://hiddentreasure.wdcc.co.nz" },
      { label: "GitHub", url: "https://github.com/UoaWDCC/hidtreas" },
    ],
  },
  {
    slug: "sign-safe",
    title: "Sign Safe",
    summary: "An ML-powered sign language translator.",
    description:
      "A sign language translator project developed for the course COMPSYS302. It uses three machine learning models (a custom ResNet, AlexNet and EfficientNet) and uses a platform where you can train these models with inputted data and make predictions with saved models. Built with python and PyQt5.",
    tags: ["PYTHON", "PYQT5", "ML"],
    images: [finger1, finger2, finger3, finger4],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/COMPSYS302/sign-safe",
      },
    ],
  },
  {
    slug: "jewel-heist",
    title: "Jewel Heist",
    summary: "A Guess Who style mystery game.",
    description:
      "A Guess Who Style game developed for the course SOFTENG206. The user has 5 minutes to guess the thief after playing through 3 minigames and interacting with the suspects. Built with Java and JavaFX.",
    tags: ["JAVA", "JAVAFX"],
    images: [guessWho1, guessWho2, guessWho3, guessWho4],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/itsatulbox/guesswho",
      },
    ],
  },
];
