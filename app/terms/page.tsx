'use client';

import React from "react";
import Link from "next/link";
import Footer from "@/components/Layout/Footer";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-[#003b5c] text-white py-16 px-6 text-center rounded-b">
        <h1 className="text-4xl font-bold text-white">Algemene Voorwaarden</h1>
        <p className="mt-4 text-lg font-medium text-white">van DuoCompensatie.nl</p>
        <p className="mt-2 text-sm">
          <strong>Ingangsdatum:</strong> 01-12-2024
        </p>
      </header>

      {/* Content */}
      <main className="flex-grow container mx-auto px-6 py-10">
        <section className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <IntroSection />

          <TermsSection
            title="1. Gebruik van de Website"
            content="U stemt ermee in DuoCompensatie.nl uitsluitend te gebruiken voor legitieme doeleinden en in overeenstemming met deze voorwaarden."
          />

          <TermsSection
            title="2. Verleende Diensten"
            content="DuoCompensatie.nl biedt informatie en tools met betrekking tot compensatie. Wij streven naar nauwkeurigheid, maar garanderen dit niet volledig."
          />

          <TermsSection
            title="3. Verplichtingen van Gebruikers"
            content="Gebruikers moeten correcte informatie verstrekken en zich houden aan alle toepasselijke wetgeving. Misbruik kan leiden tot juridische stappen."
          />

          <TermsSection
            title="4. Intellectueel Eigendom"
            content="Alle inhoud op deze website, inclusief tekst en logo's, is eigendom van DuoCompensatie.nl."
          />

          <TermsSection
            title="5. Aansprakelijkheidsverklaring"
            content="Wij zijn niet aansprakelijk voor enige schade die voortvloeit uit het gebruik van deze website. Gebruik is volledig op eigen risico."
          />

          <TermsSection
            title="6. Wijzigingen"
            content="DuoCompensatie.nl behoudt zich het recht voor deze voorwaarden op elk moment te wijzigen. Wij raden aan regelmatig deze pagina te controleren."
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

// Subcomponent for reusable terms sections
const TermsSection: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-[#003b5c] mb-3">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </div>
);

// Introductory section
const IntroSection = () => (
  <div className="mb-10">
    <p className="text-gray-700 text-lg leading-relaxed">
      Welkom bij <strong>DuoCompensatie.nl</strong>. Door gebruik te maken van onze website stemt u ermee in zich te houden aan de volgende algemene voorwaarden. Lees deze voorwaarden zorgvuldig door voordat u gebruik maakt van onze diensten. Indien u niet akkoord gaat, dient u de website niet te gebruiken.
    </p>
  </div>
);

export default TermsAndConditions;
