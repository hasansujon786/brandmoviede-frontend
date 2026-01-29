import { loadStripe } from "@stripe/stripe-js";

// process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
export const stripePromise = loadStripe(
  "pk_test_51SB7d0AwY7ujXaVJxSrzMEWLsZoeI5yeHTTuiwzEIsc2bHLXrwtrh4JQJIF7xAuPb9XiMzTWtTzD6KPN8ppUniux00JniCa3nK",
);
