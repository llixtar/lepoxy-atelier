import type { Metadata } from "next";
import { Inter, Playfair_Display, Prata, Lexend_Peta } from "next/font/google";
import "./globals.css";
// ОСЬ ЦЬОГО ІМПОРТУ НЕ ВИСТАЧАЛО:
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: '--font-playfair' });
const prata = Prata({ weight: '400', subsets: ["latin"], variable: '--font-prata' });
const lexend = Lexend_Peta({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-lexend' });

export const metadata: Metadata = {
  title: "Lépoxy Atelier",
  description: "Сумка, створена природою і руками жінки.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${prata.variable} ${lexend.variable} font-sans bg-cream text-dark-brown antialiased`}>
        <Header />
        <main > 
          {children}
        </main>
      </body>
    </html>
  );
}