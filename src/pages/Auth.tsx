import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="md:w-1/2 flex flex-col items-center mb-8 md:mb-0">
        <img src="https://illustrations.popsy.co/amber/mobile-payments.svg" alt="Finance Tracking" className="w-64 md:w-96 mb-6" />
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{mode === "login" ? "Welcome Back" : "Join Thousands of Students"}</h2>
        <p className="text-gray-600 text-center">{mode === "login" ? "Sign in to continue your financial journey" : "Start managing your college finances the smart way today"}</p>
      </div>

      <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        {mode === "login" ? (
          <LoginForm onSwitchMode={() => setMode("register")} />
        ) : (
          <RegisterForm
            onSwitchMode={() => setMode("login")}
            passwordRequirements={{
              minLength: 8,
              requireUppercase: true,
              requireNumber: true,
              requireSpecial: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
