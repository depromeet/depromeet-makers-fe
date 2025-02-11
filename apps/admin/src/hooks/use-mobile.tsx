import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mediaQueryList.addEventListener('change', onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => mediaQueryList.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
};
