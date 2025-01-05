export default function DonationButton() {
  const handleDonation = () => {
    // Replace with your actual Stripe Payment Link URL
    const paymentLink = 'https://buy.stripe.com/00geWzeTA9sx9EY145';
    window.location.href = paymentLink;
  };

  return (
    <div className="text-center space-y-4">
      <h3 className="text-lg font-medium text-duo-blue">
        Help ons om deze calculator gratis te houden voor jou en andere studenten!
      </h3>
      <p className="text-sm text-gray-600">
        Deze calculator is gemaakt door studenten, voor studenten. 
        Het draaiend houden kost echter geld. Jouw steun – zelfs een kleine bijdrage – 
        helpt ons om het gratis te houden voor iedereen.
      </p>
      <button
        onClick={handleDonation}
        className="duo-button inline-flex items-center justify-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
      >
        <span>Doneer €1</span>
      </button>
    </div>
  );
}
