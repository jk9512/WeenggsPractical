import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export default function Topbar({ onToggleDark, dark }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">App</h1>
      <div className="flex items-center gap-2">
        <button onClick={onToggleDark} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
          {dark ? <Brightness7Icon/> : <Brightness4Icon/>}
        </button>
      </div>
    </div>
  )
}
