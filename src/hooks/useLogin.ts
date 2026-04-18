import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { tokenStorage } from '../api/client';

export function useLogin() {
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      login(username, password),
    onSuccess: (data) => {
      tokenStorage.set(data.accessToken);
      const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/';
      window.location.replace(returnTo);
    },
  });
}
