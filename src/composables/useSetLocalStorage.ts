export const useSetLocalStorage = () => {
  // set token to cookie
  const tokeyKey = encodeURIComponent("auth._token.local");

  const setLocalStorageToken = (idToken: string): void => {
    const value = `Bearer ${idToken}`;

    if (typeof window !== "undefined") {
      localStorage.setItem(tokeyKey, value);
    }
  };

  return {
    setLocalStorageToken,
  };
};
