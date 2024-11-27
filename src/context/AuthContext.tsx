/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react"

interface AuthContextType {
  user: string | null;
  signin: (credentials: unknown) => Promise<void>;
  signup: (data: unknown) => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/auth'
  const API_USER_URL = import.meta.env.VITE_API_USER_URL || 'http://localhost:5000/users'

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
      const response = await fetch(`${API_USER_URL}/signup`, {
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signin, signup, }}>
      {children}
    </AuthContext.Provider>
  )
}
