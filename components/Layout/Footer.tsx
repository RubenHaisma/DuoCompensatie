import React from 'react';

export default function Footer() {
  return (
    <footer
      className="mt-16 py-6 bg-[#003b5c] text-white rounded-t-2xl"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Copyright and Attribution */}
        <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
          <p className="text-sm font-medium text-gray-300">
            <a
              href="https://ihn-solutions.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:underline"
            >
              &copy; {new Date().getFullYear()} IHN - Solutions
            </a>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs font-light text-gray-400">
          Deze calculator is een onafhankelijk hulpmiddel en is niet geaffilieerd met DUO of de Nederlandse overheid.
          Alle berekeningen zijn gebaseerd op officiële informatie maar dienen alleen ter indicatie.
        </p>
      </div>
    </footer>
  );
}
