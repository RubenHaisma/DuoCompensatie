export default function DonationButton() {
  const handleDonation = () => {
    // Replace with your actual Stripe Payment Link URL
    const paymentLink = 'https://buy.stripe.com/eVa8yb5j09sx18seUU';
    window.location.href = paymentLink;
  };

  return (
    <div className="text-center space-y-4">
      <h3 className="text-lg font-medium text-duo-blue">Steun dit project</h3>
      <p className="text-sm text-gray-600">
        Help ons deze calculator gratis beschikbaar te houden voor alle studenten
      </p>
      <button
        onClick={handleDonation}
        className="duo-button inline-flex items-center justify-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
      >
        <span>Doneer €5</span>
      </button>
    </div>
  );
}
