import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePublishableKey = import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key. Please add PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.');
}

export const stripe = loadStripe(stripePublishableKey);

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: stripePublishableKey,
  currency: 'usd',
  paymentMethods: ['card'],
};

// Create payment intent (call this from your server/edge function)
export const createPaymentIntent = async (amount: number, bookingId: string) => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      bookingId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment intent');
  }

  return response.json();
};

// Confirm payment
export const confirmPayment = async (clientSecret: string) => {
  const stripeInstance = await stripe;
  if (!stripeInstance) throw new Error('Stripe not initialized');

  return stripeInstance.confirmPayment({
    clientSecret,
    confirmParams: {
      return_url: `${window.location.origin}/booking/confirmation`,
    },
  });
};