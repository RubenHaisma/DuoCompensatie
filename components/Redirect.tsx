import { ExternalLinkIcon } from 'lucide-react';

export default function GovernmentPaymentInfo() {
  const handleRedirect = () => {
    window.location.href = 'https://duohelper.nl';
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="bg-orange-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">
          Bereken ook hoeveel je maandelijks moet gaan betalen
        </h2>
        <p className="text-gray-700 mt-2">
          Wil je weten hoeveel je aan de overheid moet betalen? Bezoek onze andere website{' '}
          <span className="font-bold text-orange-700">duohelper.nl</span> en krijg direct inzicht.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-4 inline-flex items-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          <span>Bezoek duohelper.nl</span>
          <ExternalLinkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
