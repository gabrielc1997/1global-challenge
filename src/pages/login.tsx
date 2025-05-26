import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useRegister } from '@/hooks/useRegister';
import AuthTemplate from '@/components/templates/AuthTemplate';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering && password !== confirm) {
      alert('Passwords do not match');
      return;
    }

    const payload = { email, password };
    isRegistering ? registerMutation.mutate(payload) : loginMutation.mutate(payload);
  };

  return (
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
  );
}