import axios from 'axios';

const URL = process.env.EXPO_PUBLIC_API_URL;



export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${URL}/auth/user`, { email, password });
    return response.data.token;
  } catch (error) {
    throw new Error('Falha ao realizar login');
  }
};
