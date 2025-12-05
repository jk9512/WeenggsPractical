import React, { createContext, useContext, useState, useEffect } from 'react'
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (!loggedIn) {
      setUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem('loggedIn')
    }
  }, [loggedIn])

  function login({ username, password }) {
    // Dummy login
    if (username === 'admin' && password === '123') {
      const u = { name: 'Admin', username: 'admin' }
      setUser(u)
      setLoggedIn(true)
      localStorage.setItem('user', JSON.stringify(u))
      localStorage.setItem('loggedIn', 'true')
      return true
    }
    return false
  }

  function logout() {
    setLoggedIn(false)
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('loggedIn')
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
