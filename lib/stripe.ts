import { loadStripe } from '@stripe/stripe-js';
import { SUBSCRIPTION_PLANS } from './constants';
import { supabase } from './supabase';

export const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const createCheckoutSession = async (priceId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) throw new Error('Not authenticated');

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId: session.user.id,
      }),
    });

    const { sessionId } = await response.json();
    const stripeInstance = await stripe;
    await stripeInstance?.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};