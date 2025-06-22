// src/context/AuthContext.tsx
import React, { ReactNode, useState } from 'react';
// Make sure the following file exists and exports AuthContext and User
// Define the User type here
export type User = {
  id: string;
  name: string;
  email: string;
};

// Create and export the AuthContext here
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

// 4. Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Your actual login logic here
    // Example: Use password here (e.g., send to an API or log it)
    console.log("Logging in with:", email, password);
    setUser({
      id: '1',
      name: 'Test User',
      email: email
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. The useAuth hook has been moved to a separate file (useAuth.ts)


// Remove duplicate User type and AuthContext definition since they are imported from './AuthContextObject'