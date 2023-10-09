"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

import { checkAuthCookie } from "@/helpers/auth";
import { AuthActionsEnum, AuthContextType, AuthState } from "@/types/auth";
import { authReducer } from "@/reducers/authReducer";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const token = checkAuthCookie();

    if (token) {
      dispatch({ type: AuthActionsEnum.LOGIN, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
