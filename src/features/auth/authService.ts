import axios from 'axios';

const apiKey = 'reqres-free-v1';

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    'https://reqres.in/api/login',
    { email, password },
    { headers: { 'x-api-key': apiKey } }
  );
  return response.data.token;
};

export const register = async (email: string, password: string) => {
  const response = await axios.post(
    'https://reqres.in/api/register',
    { email, password },
    { headers: { 'x-api-key': apiKey } }
  );  
  return response.data.token;
};