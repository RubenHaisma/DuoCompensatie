export const REPAYMENT_SCHEMES = {
    SF35: {
      years: 35,
      freeThreshold: 24000, // Annual income threshold
      repaymentPercentage: 0.04,
    },
    SF15: {
      years: 15,
      freeThreshold: 21000,
      repaymentPercentage: 0.12,
    },
    'SF15-oud': {
      years: 15,
      freeThreshold: 20000,
      repaymentPercentage: 0.12,
    },
  } as const;
  
  export const SUBSCRIPTION_PLANS = {
    MONTHLY: {
      price: 4.99,
      id: 'price_monthly',
    },
    LIFETIME: {
      price: 39.99,
      id: 'price_lifetime',
    },
  } as const;