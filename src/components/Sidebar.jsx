import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import WorkIcon from '@mui/icons-material/Work'
import clsx from 'clsx'

export default function Sidebar() {
  const { logout } = useAuth()
  const nav = useNavigate()

  function doLogout(){
    logout()
    nav('/login')
  }

  const linkClass = ({ isActive }) => clsx('flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800', isActive && 'bg-gray-200 dark:bg-gray-800 font-semibold')

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen p-4 border-r dark:border-gray-700 hidden md:block">
      <div className="mb-6">
        <h2 className="text-xl font-bold">React Dashboard</h2>
        <p className="text-sm text-gray-500">Mini admin</p>
      </div>

      <nav className="flex flex-col gap-1">
        <NavLink to="/" className={linkClass}><HomeIcon /> Dashboard</NavLink>
        <NavLink to="/users" className={linkClass}><GroupIcon /> Users</NavLink>
        <NavLink to="/projects" className={linkClass}><WorkIcon /> Projects</NavLink>
      </nav>

      <div className="mt-auto pt-4">
        <button className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800" onClick={doLogout}><LogoutIcon/> Logout</button>
      </div>
    </aside>
  )
}
