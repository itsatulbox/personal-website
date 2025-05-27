import type { Metadata } from "next";
import "./globals.css";
import { Figtree, Azeret_Mono, IBM_Plex_Mono } from "next/font/google";
import NavBar from "@/components/common/navbar";
import { Providers } from "./providers";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
});

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm",
  weight: "600",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atulkodla.com"),
  title: {
    default: "Atul Kodla",
    template: "%s | Atul Kodla",
  },
  description: "Software Engineering student at the University of Auckland.",

  openGraph: {
    title: "Atul Kodla",
    description: "Software Engineering student at the University of Auckland.",
    url: "https://atulkodla.com",
    siteName: "Atul Kodla",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Atul Kodla",
    description: "Software Engineering student at the University of Auckland.",
  },

  alternates: {
    canonical: "https://atulkodla.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${figtree.variable} ${azeret.variable} ${ibm.variable} antialiased`}
      >
        <Providers>
          <NavBar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
