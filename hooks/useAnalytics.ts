import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from '../utils/analytics';
import { getCookie } from '../lib/cookies';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const consentGranted = getCookie(COOKIE_CONSENT_KEY) === 'true';

    if (consentGranted) {
      // Trigger analytics pageview only if consent is granted
      pageview(location.pathname + location.search);
    }
  }, [location]);
};
