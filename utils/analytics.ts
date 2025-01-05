import { GA_TRACKING_ID } from '../config/analytics';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: string, action: string, params?: Record<string, any>) => void;
  }
}

// Initialize Google Analytics with consent check
export const initGA = () => {
  const consentGranted = getConsentState();

  if (!consentGranted) {
    console.warn('Google Analytics is not initialized because consent is not granted.');
    return;
  }

  // Load the Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `;
  document.head.appendChild(script2);
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } else {
    console.warn('Google Analytics is not initialized. Pageview not tracked.');
  }
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.warn('Google Analytics is not initialized. Event not tracked.');
  }
};

// Utility function to check consent state
const getConsentState = (): boolean => {
  const consent = localStorage.getItem('cookie-consent');
  return consent === 'true';
};
