import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    const ok = login({ username, password })
    if(ok) nav('/')
    else setErr('Invalid credentials. Use admin / 123')
  }

  return (
    <div className="max-w-md mx-auto mt-24 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="border p-2 rounded bg-gray-50 dark:bg-gray-900" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input type="password" className="border p-2 rounded bg-gray-50 dark:bg-gray-900" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white py-2 rounded">Login</button>
        {err && <div className="text-red-500">{err}</div>}
        <div className="text-sm text-gray-500">Demo: admin / 123</div>
      </form>
    </div>
  )
}
