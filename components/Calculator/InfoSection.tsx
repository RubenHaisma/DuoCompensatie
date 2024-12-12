import { Info } from 'lucide-react';

export default function InfoSection() {
  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Info className="w-5 h-5" />
        <h2 className="font-medium">Belangrijke Informatie</h2>
      </div>
      <ul className="text-sm text-gray-600 space-y-2">
        <li>• Compensatie wordt eerst gebruikt om bestaande studieschuld te verminderen</li>
        <li>• Eventueel resterend bedrag wordt binnen zes weken uitbetaald</li>
        <li>• Automatische meldingen zijn gestart in januari 2024 voor in aanmerking komende afgestudeerden</li>
        <li>
          <a
            href="https://duo.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Bezoek de DUO website
          </a>{' '}
          voor meer informatie
        </li>
      </ul>
    </div>
  );
}