import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 py-8 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} IHN - Solutions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Gemaakt door</span>
            <a
              href="https://ihn-solutions.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-duo-blue hover:text-duo-orange font-medium transition-colors"
            >
              IHN Solutions
            </a>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-500 text-center max-w-2xl mx-auto">
          Deze calculator is een onafhankelijk hulpmiddel en is niet geaffilieerd met DUO of de Nederlandse overheid.
          Alle berekeningen zijn gebaseerd op officiële informatie maar dienen alleen ter indicatie.
        </div>
      </div>
    </footer>
  );
}