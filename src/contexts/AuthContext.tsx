import React, { useState, createContext, useContext } from "react";

export const AuthContext = createContext<any>({}); // Use 'any' as the default value for createContext

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
