import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Witcher Oracle - O Oráculo do Bruxo",
  description:
    "Consulte o Oráculo do Bruxo — um assistente de IA com o conhecimento do mundo de The Witcher. Pergunte sobre monstros, poções, sinais, personagens e mais.",
  keywords: [
    "The Witcher",
    "Oráculo do Bruxo",
    "IA Witcher",
    "monstros Witcher",
    "poções Witcher",
    "sinais Witcher",
    "personagens Witcher",
    "chat IA Witcher",
    "assistente Witcher",
    "fantasia medieval",
    "RPG Witcher",
  ],
  authors: [{ name: "RafaelProfMgz" }],
  creator: "RafaelProfMgz",
  openGraph: {
    title: "Witcher Oracle - O Oráculo do Bruxo",
    description:
      "Consulte o Oráculo do Bruxo — um assistente de IA com o conhecimento do mundo de The Witcher. Pergunte sobre monstros, poções, sinais, personagens e mais.",
    url: "https://chat-the-witcher.vercel.app/",
    siteName: "Witcher Oracle",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Witcher Oracle - O Oráculo do Bruxo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Witcher Oracle - O Oráculo do Bruxo",
    description:
      "Consulte o Oráculo do Bruxo — um assistente de IA com o conhecimento do mundo de The Witcher.",
    site: "@witcheroracle",
    creator: "@witcheroracle",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://chat-the-witcher.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/pt-BR",
      "en-US": "/en-US",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cinzel.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-witcher-dark text-white antialiased witcher-bg">
        <Analytics />
        <Background />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
