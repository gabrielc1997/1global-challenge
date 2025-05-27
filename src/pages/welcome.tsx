import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import BackOfficeTemplate from '@/components/templates/BackOfficeTemplate';

export default function WelcomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/login');
  }, [user, router]);

  if (!user) return null;

  return <BackOfficeTemplate />;
}