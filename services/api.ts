import axios from 'axios';
import useUserStore from '../store/userStore';

const URL = process.env.EXPO_PUBLIC_API_URL;


// Crie uma instância do axios
const api = axios.create({
  baseURL: URL,
});

// Adicione um interceptor para incluir o token
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
