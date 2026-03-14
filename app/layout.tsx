import type { Metadata } from "next";
import { Inter, Playfair_Display, Prata, Lexend_Peta } from "next/font/google";
import Script from "next/script"; // ДОДАЛИ ІМПОРТ SCRIPT
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: '--font-playfair' });
const prata = Prata({ weight: '400', subsets: ["latin"], variable: '--font-prata' });
const lexend = Lexend_Peta({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-lexend' });

export const metadata: Metadata = {
  title: {
    template: '%s | Lépoxy Atelier',
    default: 'Lépoxy Atelier — Ексклюзивні сумки ручної роботи', 
  },
  description: 'Унікальні жіночі сумки з натуральної шкіри та справжніх квітів, збережених в епоксидній смолі. Створіть свій дизайн або оберіть готову сумку з наявності.',
  keywords: [
    'сумки ручної роботи', 
    'сумки з епоксидної смоли', 
    'шкіряні сумки Україна', 
    'ексклюзивні аксесуари', 
    'подарунок жінці', 
    'Lépoxy Atelier', 
    'сумки з живими квітами'
  ],
  authors: [{ name: 'Lépoxy Atelier' }],
  metadataBase: new URL('https://lepoxy-atelier.com.ua'), 
  openGraph: {
    title: 'Lépoxy Atelier — Ексклюзивні сумки ручної роботи',
    description: 'Унікальні жіночі сумки з натуральної шкіри та квітів в епоксидній смолі. Відчуй красу природи.',
    url: '/',
    siteName: 'Lépoxy Atelier',
    images: [
      {
        url: '/images/hero-desktop.jpg', 
        width: 1200,
        height: 630,
        alt: 'Колекція сумок Lépoxy Atelier',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${prata.variable} ${lexend.variable} font-sans bg-cream text-dark-brown antialiased`}>
        
        {/* --- GOOGLE ANALYTICS (GA4) --- */}
        {/* ЗАМІНИТИ 'G-XXXXXXXXXX' НА РЕАЛЬНИЙ ID */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* --- META PIXEL --- */}
        {/* ЗАМІНИТИ 'XXXXXXXXXXXXXXXX' НА РЕАЛЬНИЙ PIXEL ID */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>

        <Header />
        <main> 
          {children}
        </main>
        <Footer />
        
      </body>
    </html>
  );
}