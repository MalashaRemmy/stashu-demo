// Make sure ApiClient is exported from the correct file
// Update the import path to the correct location of ApiClient
// Update the path below if your ApiClient is located elsewhere
import { ApiClient } from './index'; // Path corrected
import type { AuthResponse, LoginCredentials, RegisterData } from '../types/auth';

class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await ApiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await ApiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  }

  static async logout(): Promise<void> {
    return ApiClient.post('/auth/logout', {});
  }

  static async getCurrentUser(): Promise<AuthResponse> {
    const response = await ApiClient.get<AuthResponse>('/auth/me');
    return response.data;
  }
}

export { AuthService };