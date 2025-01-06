'use client';

import React from "react";
import Link from "next/link";
import Footer from "@/components/Layout/Footer";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-[#003b5c] text-white py-16 px-6 text-center rounded-b">
        <h1 className="text-4xl font-bold text-white">Privacybeleid</h1>
        <p className="mt-4 text-lg font-medium text-white">van DuoCompensatie.nl</p>
        <p className="mt-2 text-sm">
          <strong>Ingangsdatum:</strong> 01-12-2024
        </p>
      </header>

      {/* Content */}
      <main className="flex-grow container mx-auto px-6 py-10">
        <section className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <IntroSection />

          <PrivacySection
            title="1. Verzamelde Gegevens"
            content="Wij verzamelen persoonlijke gegevens die u vrijwillig aan ons verstrekt, zoals uw naam, e-mailadres en andere contactgegevens wanneer u onze diensten gebruikt of contact met ons opneemt."
          />

          <PrivacySection
            title="2. Gebruik van Gegevens"
            content="Uw gegevens worden gebruikt om onze diensten te leveren, uw vragen te beantwoorden, en onze website te verbeteren. Wij zullen uw gegevens nooit verkopen aan derden."
          />

          <PrivacySection
            title="3. Gegevensbeveiliging"
            content="Wij nemen passende beveiligingsmaatregelen om uw persoonlijke gegevens te beschermen tegen ongeautoriseerde toegang, wijziging of vernietiging."
          />

          <PrivacySection
            title="4. Cookies"
            content="Onze website maakt gebruik van cookies om de gebruikerservaring te verbeteren. U kunt uw cookievoorkeuren instellen via uw browser."
          />

          <PrivacySection
            title="5. Uw Rechten"
            content={
              <>
                U heeft het recht om toegang te vragen tot uw gegevens, deze te corrigeren, te laten verwijderen of bezwaar te maken tegen de verwerking. Neem contact met ons op via{" "}
                <a href="mailto:contact@DuoCompensatie.nl" className="text-blue-600 hover:underline">
                  <strong>contact@DuoCompensatie.nl</strong>
                </a>{" "}
                om uw rechten uit te oefenen.
              </>
            }
          />

          <PrivacySection
            title="6. Wijzigingen"
            content="Dit privacybeleid kan worden bijgewerkt. Wij raden u aan deze pagina regelmatig te controleren voor wijzigingen."
          />
        </section>
      </main>

      {/* Back Button */}
      <div className="flex justify-center mt-10 mb-16">
        <Link href="/">
          <button className="bg-[#003b5c] text-white py-3 px-8 rounded-md text-lg hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400">
            Terug naar de homepage
          </button>
        </Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Subcomponent for reusable privacy sections
const PrivacySection: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-[#003b5c] mb-3">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </div>
);

// Introductory section
const IntroSection = () => (
  <div className="mb-10">
    <p className="text-gray-700 text-lg leading-relaxed">
      Bij <strong>DuoCompensatie.nl</strong> hechten wij veel waarde aan uw privacy. Dit privacybeleid legt uit welke gegevens wij verzamelen, hoe wij deze gebruiken en welke rechten u heeft met betrekking tot uw persoonsgegevens.
    </p>
  </div>
);

export default PrivacyPolicy;
