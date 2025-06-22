import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust the baseURL as needed
});

export default api;

interface UpdateProfileParams {
  userId: string;
  name: string;
  email: string;
}

export const updateUserProfile = async (params: UpdateProfileParams) => {
  const response = await api.put(`/users/${params.userId}`, {
    name: params.name,
    email: params.email
  });
  return response.data;
};