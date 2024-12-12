'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Button } from './UI/button';
import { useCookieConsent } from '../hooks/use-cookie-consent';

const CookieBanner: React.FC = () => {
  const { consent, acceptCookies } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (consent === null) {
        setIsVisible(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [consent]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-[#0c2b4e]/90 backdrop-blur-md border-t border-[#e17000]/20 z-50"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-5 w-5 text-[#e17000]" />
              <p className="text-sm text-[#f2f7fc]">
                Wij gebruiken cookies om uw ervaring te verbeteren.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                onClick={() => {
                  acceptCookies();
                  handleClose();
                }}
                className="bg-[#e17000] hover:bg-[#e17000]/90 text-white"
              >
                Accepteer
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
