import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useRegister } from '@/hooks/useRegister';
import AuthTemplate from '@/components/templates/AuthTemplate';
import SnackbarAlert from '@/components/atoms/SnackBar';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering && password !== confirm) {
      setSnackbarOpen(true);
      return;
    }

    const payload = { email, password };
    isRegistering ? registerMutation.mutate(payload) : loginMutation.mutate(payload);
  };

  return (
    <>
      <AuthTemplate
        isRegistering={isRegistering}
        email={email}
        password={password}
        confirm={confirm}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onConfirmChange={setConfirm}
        onToggle={() => setIsRegistering((prev) => !prev)}
        onSubmit={handleSubmit}
      />

      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="Passwords do not match"
        severity="error"
      />
    </>
  );
}