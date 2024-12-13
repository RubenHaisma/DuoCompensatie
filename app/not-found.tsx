'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Custom404() {
  useEffect(() => {
    document.title = "404 - Oeps! Pagina Niet Gevonden";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#003b5c] mb-4">
          Oeps! Pagina Niet Gevonden
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Het lijkt erop dat de pagina die je zoekt niet bestaat of is verplaatst.
        </p>
        <Link href="/">
          <button className="duo-button">
            Ga terug naar de Homepagina
          </button>
        </Link>
      </div>

      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        <p>Kom je er niet uit? Misschien kun je contact opnemen met ons team!</p>
      </footer>
    </div>
  );
}
