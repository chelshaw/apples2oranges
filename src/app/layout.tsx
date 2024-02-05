import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/shared/header";
import "./globals.css";

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
