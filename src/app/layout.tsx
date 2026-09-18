import type { Metadata } from "next";
import "./globals.css";
import { Figtree, Azeret_Mono } from "next/font/google";
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

const description = "Software Engineer.";

export const metadata: Metadata = {
  metadataBase: new URL("https://atulkodla.com"),
  title: {
    default: "Atul Kodla",
    template: "%s | Atul Kodla",
  },
  description,

  // noarchive keeps the pages out of Bing Copilot answers and Microsoft's
  // model training; Google ignores it (no cached-link feature any more).
  robots: {
    index: true,
    follow: true,
    noarchive: true,
  },

  openGraph: {
    title: "Atul Kodla",
    description,
    url: "https://atulkodla.com",
    siteName: "Atul Kodla",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Atul Kodla",
    description,
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
        className={`${figtree.variable} ${azeret.variable} antialiased`}
      >
        <Providers>
          {/*
            data-nosnippet stops Google using anything rendered on the page as a
            search snippet or as input to AI Overviews / AI Mode. Search results
            fall back to the meta description above.
          */}
          <div data-nosnippet="">
            <NavBar />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
