// src/pages/login.tsx
import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useRegister } from '@/hooks/useRegister';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== confirm) {
        alert('Passwords do not match!');
        return;
      }

      registerMutation.mutate({ email, password });
    } else {
      loginMutation.mutate({ email, password });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded mb-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <p className="text-center text-sm mt-4">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 underline"
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </form>
    </div>
  );
}
