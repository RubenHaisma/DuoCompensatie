'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../lib/cookies';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedConsent = getCookie(COOKIE_CONSENT_KEY);
    if (storedConsent !== undefined) {
      const isGranted = storedConsent === 'true';
      setConsent(isGranted);

      // Set Google Consent Mode default state
      updateGoogleConsentMode(isGranted);
    }
  }, []);

  const acceptCookies = () => {
    setCookie(COOKIE_CONSENT_KEY, 'true', 365);
    setConsent(true);

    // Update Google Consent Mode
    updateGoogleConsentMode(true);
  };

  const declineCookies = () => {
    setCookie(COOKIE_CONSENT_KEY, 'false', 365);
    setConsent(false);

    // Update Google Consent Mode
    updateGoogleConsentMode(false);
  };

  const updateGoogleConsentMode = (isGranted: boolean) => {
    // Initialize dataLayer if not already done
    window.dataLayer = window.dataLayer || [];
  
    // Call gtag function to update consent mode
    window.gtag('consent', 'update', {
      ad_storage: isGranted ? 'granted' : 'denied',
      analytics_storage: isGranted ? 'granted' : 'denied',
      ad_personalization: isGranted ? 'granted' : 'denied',
    });
  };
  

  return {
    consent,
    acceptCookies,
    declineCookies,
  };
}
