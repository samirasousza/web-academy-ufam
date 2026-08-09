"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("user", email);
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
