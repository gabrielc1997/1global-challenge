import apiClient from '@/pages/api/apiClient';

export const fetchBackOfficeUsers = async (page: number, perPage: number) => {
  const response = await apiClient.get('/users', {
    params: { page, per_page: perPage },
  });
  return response.data;
};

export const deleteBackOfficeUser = async (id: number) => {
  await apiClient.delete(`/users/${id}`);
};