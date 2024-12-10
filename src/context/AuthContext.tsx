/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface UserUrl {
  id: number;
  url: string;
  slug: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: { id: number, email: string, full_name: string, urls: UserUrl[] } | null;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = 'http://localhost:9000/auth'
  const API_USER_URL = 'http://localhost:9000/users'

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_USER_URL}/profile`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Not authenticated')
        }
        const data = await response.json()
        setUser(data.user)
        // user?.urls.map((url: any) => {
        //   console.log(url)
        // })
        setIsAuthenticated(true)
      }

      catch (error) {
        console.error(error)
        setIsAuthenticated(null)
        setUser(null)
        setIsLoading(false)
      }

      finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signin = async (credentials: any, callbackUrl = '/dashboard') => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.data)
        setIsAuthenticated(true)
        window.location.replace(callbackUrl)
      }

      else {
        throw new Error(data.message)
      }

    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  const signup = async (credentials: any, callbackUrl = '/dashboard') => {
    try {
      const response = await fetch(`${API_USER_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.data)
        setIsAuthenticated(true)
        window.location.replace(callbackUrl)
      }

      else {
        setIsAuthenticated(null)
      }

    }
    catch (error) {
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
      setIsAuthenticated(null)
      window.location.origin
    }
    catch (error) {
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
