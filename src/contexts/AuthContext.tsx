import { repositories } from "@/repositories/factories/RepositoryFactory";
import React, { useState, createContext, useContext, useEffect } from "react";

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

  useEffect(() => {
    const fetchUser = async (idToken: string) => {
      await repositories
        .user()
        .userAccount(idToken)
        .then(async (response: any) => {
          console.log("🚀 ~ file: index.tsx:30 ~ response:", response);
          setIsLoggedIn(true);
          setAuthUser({ ...response.data });
        });
    };

    const idToken = localStorage.getItem("auth._token.local");
    console.log("🚀 ~ file: _app.tsx:26 ~ idToken:", idToken);
    if (idToken) {
      const token = idToken.split(" ")[1];
      fetchUser(token);
    }
  }, []);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
