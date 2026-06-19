import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pavan Borigi | AI & Machine Learning Engineer Portfolio",
  description: "Portfolio of Pavan Borigi, an AI/ML Engineer focusing on Machine Learning, Computer Vision, NLP, Deep Learning, and Generative AI.",
  keywords: [
    "Pavan Borigi",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision Developer",
    "Deep Learning",
    "Generative AI",
    "PyTorch",
    "YOLOv8",
    "Next.js Portfolio"
  ],
  authors: [{ name: "Pavan Borigi" }],
  creator: "Pavan Borigi",
  openGraph: {
    title: "Pavan Borigi | AI & Machine Learning Engineer Portfolio",
    description: "Futuristic 3D AI/ML Developer Portfolio for Pavan Borigi.",
    url: "https://pavan-borigi.dev",
    siteName: "Pavan Borigi Portfolio",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavan Borigi | AI & Machine Learning Engineer Portfolio",
    description: "Futuristic 3D AI/ML Developer Portfolio for Pavan Borigi."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${outfit.variable} ${spaceGrotesk.variable} bg-[#080808] text-[#f3f4f6] font-sans antialiased overflow-x-hidden min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
