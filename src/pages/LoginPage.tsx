import { type FormEvent, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: doLogin, isPending, isError, error } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    doLogin({ username, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Colleger</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {isError && (
            <p className="text-sm text-red-600">
              {error?.message === 'HTTP 401' ? 'Invalid username or password.' : 'Something went wrong. Please try again.'}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-lg py-2 text-sm transition-colors"
          >
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
