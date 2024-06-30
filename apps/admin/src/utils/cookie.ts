export const cookieStringToObject = (cookieString: string): Record<string, string> => {
  return cookieString.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    return { ...acc, [key.trim()]: value };
  }, {});
};
