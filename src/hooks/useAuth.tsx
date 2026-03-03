import { useState, useEffect, createContext, useContext } from "react";
import * as storage from "@/lib/localStorage";

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      setUser({
        id: currentUser.id,
        email: currentUser.email,
        isAdmin: currentUser.isAdmin,
      });
    }
    setLoading(false);
  }, []);

  const signOut = () => {
    storage.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.isAdmin || false, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
