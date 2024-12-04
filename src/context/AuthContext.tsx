/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: { id: number, email: string, full_name: string } | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  signin: (credentials: unknown) => Promise<void>;
  signup: (data: unknown) => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const API_URL = 'http://localhost:9000/auth'
  const API_USER_URL = 'http://localhost:9000/users'

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const response = await fetch(`${API_USER_URL}/profile`, {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData.data)

          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error(error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [isAuthenticated])

  const signin = async (credentials: any) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (response.ok) {
        const userData = await response.json()

        setUser(userData.data)
        setIsAuthenticated(true)

        navigate('/dashboard')
      } else {
        throw new Error('Error signing in')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signup = async (credentials: any) => {
    try {
      const response = await fetch(`${API_USER_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (response.ok) {
        navigate('/signin')
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Error signing out')
      }
      setUser(null)
      setIsAuthenticated(false)
      navigate('/signin')

    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin, signup, signout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
