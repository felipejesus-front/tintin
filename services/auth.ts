import axios from 'axios';

const JANUS_API_URL = 'https://seu-endpoint-janus.com';

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${JANUS_API_URL}/login`, { email, password });
    // Supondo que a resposta contenha { token: "JWT..." }
    return response.data.token;
  } catch (error) {
    throw new Error('Falha ao realizar login');
  }
};
