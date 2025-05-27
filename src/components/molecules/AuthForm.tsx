import Input from '@/components/atoms/input';
import PrimaryButton from '@/components/atoms/PrimaryButton';
import Title from '@/components/atoms/Title';
import { Button, Box } from '@mui/material';

interface Props {
  isRegistering: boolean;
  email: string;
  password: string;
  confirm: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onConfirmChange: (v: string) => void;
  onToggle: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuthForm({
  isRegistering,
  email,
  password,
  confirm,
  onEmailChange,
  onPasswordChange,
  onConfirmChange,
  onToggle,
  onSubmit,
}: Props) {
  return (
    <Box component="form" onSubmit={onSubmit} width="100%">
      <Title>{isRegistering ? 'Sign up' : 'Login'}</Title>

      <Input label="Email" inputProps={{ 'data-testid': 'email' }} value={email} onChange={(e) => onEmailChange(e.target.value)} />
      <Input label="Password" inputProps={{ 'data-testid': 'password' }} type="password" value={password} onChange={(e) => onPasswordChange(e.target.value)} />

      {isRegistering && (
        <Input label="Confirm password" type="password" inputProps={{ 'data-testid': 'confirm-password' }} value={confirm} onChange={(e) => onConfirmChange(e.target.value)} />
      )}
 
      <PrimaryButton type="submit" data-testid="send-button">{isRegistering ? 'Sign up' : 'Login'}</PrimaryButton>

      <Button fullWidth sx={{ mt: 2 }} data-testid="toggle-button" onClick={onToggle}>
        {isRegistering ? 'Already have an account?' : 'Create an account'}
      </Button>
    </Box>
  );
}
