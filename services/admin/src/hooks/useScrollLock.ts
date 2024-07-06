import React from 'react';

export const useScrollLock = () => {
  const lockScroll = React.useCallback(() => {
    document.body.dataset.scrollLock = 'true';
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
