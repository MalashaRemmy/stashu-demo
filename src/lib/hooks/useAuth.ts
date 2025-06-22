import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../components/store';
import { AuthService } from '../../services/authService';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} from '../../components/store/authSlice';
import type { LoginCredentials, RegisterData } from '../../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && localStorage.getItem('token')) {
        try {
          const response = await AuthService.getCurrentUser();
          dispatch(loginSuccess(response));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          localStorage.removeItem('token');
          dispatch(logout());
        }
      }
    };

    checkAuth();
  }, [dispatch, isAuthenticated]);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(loginStart());
      const response = await AuthService.login(credentials);
      localStorage.setItem('token', response.token);
      dispatch(loginSuccess(response));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      dispatch(registerStart());
      const response = await AuthService.register(data);
      localStorage.setItem('token', response.token);
      dispatch(registerSuccess(response));
      navigate('/');
    } catch (error) {
      dispatch(registerFailure(error instanceof Error ? error.message : 'Registration failed'));
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
  };
};

/* AuthService is imported from '../../services/authService' */