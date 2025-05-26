import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBackOfficeUsers } from './api';

export const useBackOfficeUsers = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ['backofficeUsers', page],
    queryFn: () => fetchBackOfficeUsers(page, perPage)
  });
};
