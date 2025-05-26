import axios from 'axios';
import { login } from '../authService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('authService - login', () => {
  it('should return token when login is successful', async () => {
    const mockToken = 'mocked-jwt-token';
    mockedAxios.post.mockResolvedValue({ data: { token: mockToken } });

    const token = await login('eve.holt@reqres.in', 'cityslicka');

    expect(token).toBe(mockToken);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://reqres.in/api/login',
      { email: 'eve.holt@reqres.in', password: 'cityslicka' }
    );
  });

  it('should throw error when login fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Invalid credentials'));

    await expect(login('invalid@email.com', 'wrongpass')).rejects.toThrow(
      'Invalid credentials'
    );
  });
});