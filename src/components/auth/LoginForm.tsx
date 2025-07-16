import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

type AuthFormProps = {
  onSwitchMode: () => void;
  // Add other props if needed
};

export default function LoginForm({ onSwitchMode }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  return (
    <div className="auth-container">
      <div className="auth-illustration">
        <div className="illustration-content">
          <h1>Finance Tracking</h1>
          <img 
            src="https://illustrations.popsy.co/amber/digital-nomad.svg" 
            alt="Personal Finance" 
            className="auth-image"
          />
          <p className="illustration-text">
            Track your expenses, manage budgets, and achieve your financial goals
          </p>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your financial journey</p>
          </div>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
              />
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-button primary">
              Sign In
            </button>

            <div className="social-divider">
              <span>Or sign in with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button facebook">
                <FaFacebook className="social-icon" />
                Facebook
              </button>
              <button type="button" className="social-button google">
                <FaGoogle className="social-icon" />
                Google
              </button>
              <button type="button" className="social-button twitter">
                <FaTwitter className="social-icon" />
                Twitter
              </button>
            </div>

            <div className="auth-footer">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}