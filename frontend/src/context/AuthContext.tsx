"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

import { checkAuthCookie } from "@/helpers/auth";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  token: string | null;
}

const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, token: action.token };
    case "LOGOUT":
      return { isAuthenticated: false, token: null };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

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
      dispatch({ type: "LOGIN", token });
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
