import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Background from "@/components/layout/Background";

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
  icons: {
    icon: "/favicon.ico",
  },
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
        <Background />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
