// src/components/auth/RegisterForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  onSwitchMode?: () => void;
  passwordRequirements?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireNumber?: boolean;
    requireSpecial?: boolean;
  };
}

export default function RegisterForm({ onSwitchMode = () => {}, passwordRequirements }: Props) {
  const { register: doRegister, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validate = (pwd: string) => {
    const rules = { minLength: 8, requireUppercase: true, requireNumber: true, requireSpecial: true, ...(passwordRequirements || {}) };

    if (pwd.length < rules.minLength) return `Password must be at least ${rules.minLength} characters`;
    if (rules.requireUppercase && !/[A-Z]/.test(pwd)) return "Password must contain an uppercase letter";
    if (rules.requireNumber && !/[0-9]/.test(pwd)) return "Password must contain a number";
    if (rules.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Password must contain a special character";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const pwdError = validate(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    const res = await doRegister({ name: name.trim(), email: email.trim(), password, confirmPassword: password });
    if (!res.success) {
      setError(res.message || "Registration failed");
      return;
    }

    // on success, go to dashboard
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border rounded p-2" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border rounded p-2" type="email" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border rounded p-2" type="password" required />
        <p className="text-xs text-gray-500 mt-1">At least 8 chars, an uppercase, a number & a special char.</p>
      </div>

      <button className="w-full py-2 bg-purple-600 text-white rounded" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchMode} className="text-purple-600 underline">
          Sign in
        </button>
      </p>
    </form>
  );
}
