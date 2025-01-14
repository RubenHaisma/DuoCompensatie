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

// Enhanced metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "DUO Compensatie Berekening | Studiefinanciering Calculator",
  description:
    "Ontdek hoeveel studiefinanciering compensatie je kunt ontvangen van DUO. Inclusief berekening voor basisbeurs, leenstelsel compensatie, en studievoucher voor studenten tussen 2015-2023.",
  keywords:
    "studiefinanciering compensatie, DUO compensatie, basisbeurs berekening, leenstelsel compensatie, studievoucher berekening, Nederlandse studenten, DUO calculator",
  openGraph: {
    title: "Bereken je DUO Studiefinanciering Compensatie",
    description:
      "Gebruik onze calculator om eenvoudig je compensatie te berekenen voor gemiste basisbeurs en studievoucher onder het leenstelsel.",
    type: "website",
    url: "https://duocompensatie.nl",
    locale: "nl_NL",
    images: [
      {
        url: "https://duocompensatie.nl/favicon.ico",
        width: 1200,
        height: 630,
        alt: "DUO compensatie berekening voor studiefinanciering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DUO Compensatie Calculator",
    description:
      "Bereken je studiefinanciering compensatie voor basisbeurs en studievoucher. Gebruik onze officiële tool voor een nauwkeurige berekening.",
    site: "@duocompensatie",
    images: ["https://duocompensatie.nl/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://duocompensatie.nl",
    languages: {
      "nl-NL": "https://duocompensatie.nl",
    },
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
        {/* AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9360527370960452"
          crossOrigin="anonymous"
        ></script>
        {/* Meta Tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="your-google-site-verification-code"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
