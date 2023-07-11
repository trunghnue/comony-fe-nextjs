export const useSetCookie = () => {
  // set token to cookie
  const tokeyKey = encodeURIComponent("auth._token.local");

  const setCookieToken = (idToken: string, domain: string, path: string, expiresIn: number): void => {
    console.log("🚀 ~ file: useSetCookie.ts:6 ~ path:", path);
    console.log("🚀 ~ file: useSetCookie.ts:6 ~ domain:", domain);
    const value = encodeURI(`Bearer ${idToken}`);
    const tokenExpire = expiresIn || 86400;
    console.log("🚀 ~ file: useSetCookie.ts:10 ~ tokenExpire:", tokenExpire);
    console.log("🚀 ~ file: useSetCookie.ts:10 ~ value:", value);

    if (typeof window !== "undefined") {
      if (domain && path) {
        document.cookie = `${tokeyKey}=${value}; domain=${domain}; path=${path}; max-age=${tokenExpire}; Secure`;
        console.log("🚀 ~ file: useSetCookie.ts:13 ~ document.cookie:", document.cookie);
      } else {
        document.cookie = `${tokeyKey}=${value}; max-age=${tokenExpire}; Secure`;
        console.log("🚀 ~ file: useSetCookie.ts:16 ~ document.cookie:", document.cookie);
      }
    }
  };

  // remove cookie
  const removeCookieToken = (domain: string, path: string): void => {
    if (typeof window !== "undefined") {
      document.cookie = `${tokeyKey}=; domain=${domain}; path=${path}; max-age=0`;
    }
  };

  return {
    removeCookieToken,
    setCookieToken,
  };
};
