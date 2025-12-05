import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'

export default function Dashboard(){
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users').then(r=>r.json()).then(setUsers)
    const p = JSON.parse(localStorage.getItem('projects') || '[]')
    setProjects(p)
  },[])

  return (
    <div>
      <Topbar />
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{users.length}</div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm text-gray-500">Total Projects</div>
          <div className="text-2xl font-bold">{projects.length}</div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm text-gray-500">Active Projects</div>
          <div className="text-2xl font-bold">{projects.filter(p=>p.status==='Active').length}</div>
        </div>
      </div>
    </div>
  )
}
