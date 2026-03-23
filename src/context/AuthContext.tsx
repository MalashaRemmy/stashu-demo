import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { User, LoginFormData, RegisterFormData, ApiResponse } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginFormData) => Promise<ApiResponse<void>>;
  register: (data: RegisterFormData) => Promise<ApiResponse<void>>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const userData: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          email: fbUser.email || "",
          createdAt: new Date(fbUser.metadata.creationTime || Date.now()),
          updatedAt: new Date(fbUser.metadata.lastSignInTime || Date.now()),
        };
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (data: LoginFormData): Promise<ApiResponse<void>> => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return { success: true, message: "Login successful" };
    } catch (error: any) {
      const message = error.code === 'auth/invalid-credential' 
        ? "Invalid email or password" 
        : "Login failed. Please try again.";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterFormData): Promise<ApiResponse<void>> => {
    try {
      setLoading(true);
      
      if (data.password !== data.confirmPassword) {
        return { success: false, message: "Passwords do not match" };
      }

      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: data.name });
      }
      return { success: true, message: "Registration successful" };
    } catch (error: any) {
      const message = error.code === 'auth/email-already-in-use'
        ? "Email already in use"
        : "Registration failed. Please try again.";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
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