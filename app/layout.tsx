import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

// Initialize fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default metadata for your site
export const metadata: Metadata = {
  title: "Studiefinanciering compensatie | Bereken je DUO Compensatie",
  description:
    "Bereken direct je studiefinanciering compensatie van DUO onder het leenstelsel. Basisbeurs tegemoetkoming en studievoucher berekening voor Nederlandse studenten tussen 2015-2023.",
  keywords:
    "studiefinanciering compensatie, DUO compensatie, basisbeurs terugbetaling, studievoucher berekening, leenstelsel compensatie",
  openGraph: {
    title: "Studiefinanciering Compensatie Calculator",
    description:
      "Bereken je DUO compensatie voor gemiste basisbeurs en studievoucher. Officiële berekening voor Nederlandse studenten.",
    type: "website",
    url: "https://duocompensatie.nl",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studiefinanciering Compensatie Calculator",
    description:
      "Bereken je DUO compensatie voor gemiste basisbeurs en studievoucher. Officiële berekening voor Nederlandse studenten.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
