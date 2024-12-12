// components/404.tsx

import Link from 'next/link';
import { useEffect } from 'react';

export default function Custom404() {
  useEffect(() => {
    document.title = "404 - Oeps! Pagina Niet Gevonden";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 animate__animated animate__fadeIn">Oeps!</h1>
        <p className="text-2xl mb-8 animate__animated animate__fadeIn animate__delay-1s">
          We konden de pagina die je zocht niet vinden.
        </p>
        <div className="animate__animated animate__fadeIn animate__delay-2s">
          <Link href="/">
            <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors">
              Ga terug naar de Homepagina
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-center py-4 text-sm opacity-50">
        <p>Nog steeds verdwaald? Misschien moet je eens zoeken naar een eenhoorn?</p>
      </div>
    </div>
  );
}
