import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from '@tanstack/react-query';
import { PrivateRoute } from './components/PrivateRoute';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { ToastProvider, useToast } from './context/ToastContext';
import { ApiError } from './api/client';
import type { ApiMessage } from './api/apiResponse';

// Mutable ref that bridges the QueryClient (created once, outside React) to the ToastContext.
const toastRef = { fn: null as ((msgs: ApiMessage[]) => void) | null };

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
  mutationCache: new MutationCache({
    onError: error => { if (error instanceof ApiError) toastRef.fn?.(error.messages); },
  }),
  queryCache: new QueryCache({
    onError: error => { if (error instanceof ApiError) toastRef.fn?.(error.messages); },
  }),
});

// Connects the ToastContext's addToast function to the module-level toastRef so
// the QueryClient callbacks (which run outside React's render cycle) can reach it.
function ToastBridge() {
  const { addToast } = useToast();
  useEffect(() => {
    toastRef.fn = addToast;
    return () => { toastRef.fn = null; };
  }, [addToast]);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ToastBridge />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/students" element={<StudentsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
