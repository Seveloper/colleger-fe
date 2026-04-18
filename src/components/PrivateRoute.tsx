import { Navigate, Outlet } from 'react-router-dom';
import { tokenStorage } from '../api/client';

export function PrivateRoute() {
  return tokenStorage.get() ? <Outlet /> : <Navigate to="/login" replace />;
}
