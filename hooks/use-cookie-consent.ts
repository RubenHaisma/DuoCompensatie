'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../lib/cookies';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedConsent = getCookie(COOKIE_CONSENT_KEY);
    if (storedConsent !== undefined) {
      setConsent(storedConsent === 'true');
    }
  }, []);

  const acceptCookies = () => {
    setCookie(COOKIE_CONSENT_KEY, 'true', 365);
    setConsent(true);
  };

  const declineCookies = () => {
    setCookie(COOKIE_CONSENT_KEY, 'false', 365);
    setConsent(false);
  };

  return {
    consent,
    acceptCookies,
    declineCookies,
  };
}