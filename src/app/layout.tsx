import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noé — Développeur Full-Stack | Portfolio",
  description:
    "Portfolio de Noé, développeur Full-Stack spécialisé en React, Next.js, Node.js et Prisma. Création d'applications web modernes, performantes et immersives.",
  keywords: [
    "Noé",
    "développeur",
    "full-stack",
    "React",
    "Next.js",
    "Node.js",
    "Prisma",
    "portfolio",
    "développeur web",
    "freelance",
  ],
  authors: [{ name: "Noé" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Noé — Développeur Full-Stack",
    description: "Création d'applications web modernes, performantes et immersives.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noé — Développeur Full-Stack",
    description: "Création d'applications web modernes, performantes et immersives.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
