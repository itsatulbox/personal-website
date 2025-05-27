import type { Metadata } from "next";
import "./globals.css";
import { Figtree, Azeret_Mono } from "next/font/google";
import NavBar from "@/components/common/NavBar";
import { Providers } from "./providers";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
});

export const metadata: Metadata = {
  title: "Atul Kodla",
  description: "Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} ${azeret.variable} antialiased`}>
        <Providers>
          <NavBar />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
