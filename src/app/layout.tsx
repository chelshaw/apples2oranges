import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header, { Footer } from "@/shared/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apples vs Oranges",
  description: "A NextJS App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} main-grid`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
