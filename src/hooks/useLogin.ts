import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { tokenStorage } from '../api/client';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login(username, password),
    onSuccess: (data) => {
      tokenStorage.set(data.accessToken);
      navigate('/');
    },
  });
}
