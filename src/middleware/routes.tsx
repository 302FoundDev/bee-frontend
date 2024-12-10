import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    window.location.replace('/signin')
    return null;
  }

  return <Outlet />;

}
