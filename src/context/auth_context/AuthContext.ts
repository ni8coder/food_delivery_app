import React from 'react';

export type AuthContextType = {
  signIn: () => Promise<void>;
  signUp: () => Promise<void>;
  signOut: () => void;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType,
);
