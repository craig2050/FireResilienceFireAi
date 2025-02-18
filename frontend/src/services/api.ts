import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const generateText = async (prompt: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, { prompt });
    return response.data.response;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};
