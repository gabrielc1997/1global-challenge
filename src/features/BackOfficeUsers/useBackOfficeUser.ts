import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchBackOfficeUsers,
  fetchBackOfficeUserById,
  createBackOfficeUser,
  updateBackOfficeUser,
  deleteBackOfficeUser,
} from './api';
import { BackOfficeUserRequest } from './types';


export const useBackOfficeUsers = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ['backofficeUsers', page],
    queryFn: () => fetchBackOfficeUsers(page, perPage),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useBackOfficeUserById = (id: number | null) => {
  return useQuery({
    queryKey: ['backOfficeUser', id],
    queryFn: async () => {
      if (id === null) throw new Error('User ID is null');
      const response = await fetchBackOfficeUserById(id);

      return response;
    },
    enabled: id !== null,
  });
};

export const useCreateBackOfficeUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBackOfficeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backofficeUsers'] });
    },
  });
};

export const useUpdateBackOfficeUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BackOfficeUserRequest }) =>
      updateBackOfficeUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backofficeUsers'] });
    },
  });
};

export const useDeleteBackOfficeUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBackOfficeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backofficeUsers'] });
    },
  });
};
