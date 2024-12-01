/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean | null;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const API_URL = 'http://localhost:5000/auth'
  const API_USER_URL = 'http://localhost:5000/users'

  const signin = async (credentials: unknown) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        throw new Error('Error signing in')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signup = async (data: unknown) => {
    try {
      const response = await fetch(`${API_USER_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const res = await response.json()

      if (response.status === 200) {
        // This is where we would set the user in state
        console.log(res)
      } else {
        throw new Error(res.message || 'Error registering')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signout = async () => {
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      if (response.ok) {
        setUser(null)
        setIsAuthenticated(false)
      } else {
        throw new Error('Error signing out')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_USER_URL}/get-user-data`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error(error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
