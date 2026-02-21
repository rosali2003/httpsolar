import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "httpsolarthatgoldendoodle.dog",
  description: "HTTP status codes, illustrated by Solar the Goldendoodle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-[#c8973a] border-b-4 border-[#8b5e1a] px-10 py-6 flex items-center gap-4">
          <span className="text-4xl">🐾</span>
          <Link href="/" className="group">
            <h1 className="font-mono text-2xl text-white tracking-tight group-hover:underline">
              httpsolarthatgoldendoodle.dog
            </h1>
            <p className="text-[#ffe8b8] text-sm mt-0.5">
              HTTP status codes, illustrated by Solar the Goldendoodle
            </p>
          </Link>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-[#2d1b00] text-[#c8973a] text-center py-6 font-mono text-sm">
          <p>
            Made with 🐾 and 🐶 &mdash;{" "}
            <a href="https://httpsolarthatgoldendoodle.dog" className="text-[#ffe8b8] hover:underline">
              httpsolarthatgoldendoodle.dog
            </a>
          </p>
          <p className="mt-1 text-[#7a5c30]">
            Inspired by{" "}
            <a href="https://http.cat" className="hover:underline">
              http.cat
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
