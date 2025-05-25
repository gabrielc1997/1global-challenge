import { useMutation } from '@tanstack/react-query';
import { register } from '@/features/auth/authService';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { loginSuccess } from '@/features/auth/authSlice';
import { useRouter } from 'next/router';

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      register(email, password),
    onSuccess: (token) => {
      localStorage.setItem('token', token);
      dispatch(loginSuccess(token));
      router.push('/welcome');
    },
  });
};