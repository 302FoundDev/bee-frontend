
import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    window.location.replace('/signin')
    return null;
  }

  return children ? children : <Outlet />;

}
