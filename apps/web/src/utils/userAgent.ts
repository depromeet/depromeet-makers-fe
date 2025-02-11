export const isIos = () => {
  const userAgent = navigator.userAgent;

  return Boolean(userAgent.match(/iPhone|iPad|iPod/i));
};

export const isAndroid = () => {
  const userAgent = navigator.userAgent;

  return Boolean(userAgent.match(/Android/i));
};

export const isDesktop = () => {
  return Boolean(!isAndroid() && !isIos());
};
