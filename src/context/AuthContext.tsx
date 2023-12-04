import React, { useState, useEffect, ReactNode } from 'react';
import { UserAuthType, UserType } from '../types/userAuth.types';
import { auth } from '../utils/firebase/firebase.config';
import { getUser } from '../api/user.firestore';

type AuthContextType = {
  authUser: UserAuthType | null;
  setAuthUser: React.Dispatch<React.SetStateAction<UserAuthType | null>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const defaultAuthContext: AuthContextType = {
  authUser: null,
  setAuthUser: () => {},
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: true,
};
export const AuthContext = React.createContext(defaultAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<null | UserAuthType>(
    defaultAuthContext.authUser
  );
  const [user, setUser] = useState<null | UserType>(defaultAuthContext.user);
  const [isLoggedIn, setIsLoggedIn] = useState(defaultAuthContext.isLoggedIn);
  const [isLoading, setIsLoading] = useState(defaultAuthContext.isLoading);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        const fetchedUser = await getUser(user.uid);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
        setIsLoggedIn(true);
      } else {
        setAuthUser(null);
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    authUser,
    setAuthUser,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
