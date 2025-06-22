import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/*// API client configuration
const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT)
});

// Feature flags
if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
  enableDebugTools();
}*/

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

type ApiConfig = {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
};

class ApiClient {
  private instance: AxiosInstance;
  
  constructor(config?: ApiConfig) {
    this.instance = axios.create({
      baseURL: config?.baseURL || API_BASE_URL,
      timeout: config?.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Handle unauthorized
              break;
            case 404:
              // Handle not found
              break;
            case 500:
              // Handle server error
              break;
          }
        }
        return Promise.reject(error.response?.data || error.message);
      }
    );
  }
  
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }
  
  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }
  
  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }
  
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
  
  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}

// Singleton instance
export const apiClient = new ApiClient();

// Typed API methods example
export const expenseApi = {
  getAll: () => apiClient.get<Expense[]>('/expenses'),
  create: (data: ExpenseCreateDTO) => apiClient.post<Expense>('/expenses', data),
  update: (id: string, data: ExpenseCreateDTO) => apiClient.put<Expense>(`/expenses/${id}`, data),
  delete: (id: string) => apiClient.delete<void>(`/expenses/${id}`),
};