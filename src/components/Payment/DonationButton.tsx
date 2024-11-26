import { loadStripe } from '@stripe/stripe-js';
import { EuroIcon } from 'lucide-react';
import { STRIPE_PUBLIC_KEY} from '../../config/stripe';

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default function DonationButton() {
  const handleDonation = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1QPUOrDkiFKaRWhoR72v6FmL', // Replace with your actual price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      onClick={handleDonation}
      className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
    >
      <EuroIcon className="w-5 h-5" />
      <span>Steun dit project (€5)</span>
    </button>
  );
}