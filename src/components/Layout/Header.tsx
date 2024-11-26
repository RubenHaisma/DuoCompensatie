import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-duo-blue py-8">
      <div className="container mx-auto flex flex-col items-center gap-4 px-6 text-center">
        <div className="bg-white p-3 rounded-md">
          <Calculator className="w-10 h-10 text-duo-blue" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Bereken jouw DUO compensatie
        </h1>
        <p className="text-white text-sm md:text-base">
          Ontdek binnen enkele seconden hoeveel geld jij terug krijgt van de (r)overheid.
        </p>
      </div>
    </header>
  );
}
