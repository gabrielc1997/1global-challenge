import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  try {
    const response = await axios.post(
      'https://reqres.in/api/login',
      { email, password },
      { headers: { 'x-api-key': 'reqres-free-v1' } }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Login API error:', error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: 'Unexpected error' });
  }
}