export * from './authService';
export * from './expenseService';
export * from '../services/goalService';
export * from '../services/incomeService'; 

// src/services/index.ts
import axios from 'axios'; // Make sure axios is installed (`npm install axios`)

export const ApiClient = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});