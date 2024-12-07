import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />
}

export const ProtectedAuthRoute = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to="/dashboard" state={{ message: 'You are already logged in!' }} /> : <Outlet />
}
