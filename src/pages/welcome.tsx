import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { Box, Typography, Button } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logout } from '@/features/auth/authSlice';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Typography variant="h4">
        Welcome, <strong>{user.email}</strong>!
      </Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}