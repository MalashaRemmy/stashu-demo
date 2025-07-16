import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') || 'login';
  const [mode, setMode] = useState(initialMode);

  return (
    <div className="auth-container">
      <div className="auth-illustration">
        <img src="https://illustrations.popsy.co/amber/mobile-payments.svg" alt="Finance Tracking" />
        <h2>{mode === 'login' ? 'Welcome Back' : 'Join Thousands of Students'}</h2>
        <p>{mode === 'login' ? 'Sign in to continue your financial journey' : 'Start managing your college finances the smart way today'}</p>
      </div>
      <div className="auth-form-container">
        {mode === 'login' ? (
          <LoginForm onSwitchMode={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitchMode={() => setMode('login')} />
        )}
      </div>
    </div>
  );
}