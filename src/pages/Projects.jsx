import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import DrawerEditor from '../shared/DrawerEditor'
import ModalConfirm from '../shared/ModalConfirm'

export default function Projects(){
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({name:'', desc:'', status:'Active'})
  const [editingId, setEditingId] = useState(null)
  const [drawerData, setDrawerData] = useState(null)
  const [confirm, setConfirm] = useState({open:false,id:null})

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem('projects') || '[]')
    setProjects(p)
  },[])

  useEffect(()=> localStorage.setItem('projects', JSON.stringify(projects)), [projects])

  function submit(e){
    e.preventDefault()
    if(editingId){
      setProjects(prev=> prev.map(p=> p.id===editingId?{...p, ...form}:p))
      setEditingId(null)
      setForm({name:'', desc:'', status:'Active'})
    } else {
      setProjects(prev=> [...prev, {...form, id: Date.now()}])
      setForm({name:'', desc:'', status:'Active'})
    }
  }

  function startEdit(p){
    setEditingId(p.id)
    setForm({name:p.name, desc:p.desc, status:p.status})
  }

  function openDrawer(p){
    setDrawerData(p)
  }

  function deleteProject(id){
    setProjects(prev=> prev.filter(p=>p.id!==id))
    setConfirm({open:false,id:null})
  }

  return (
    <div>
      <Topbar />
      <h2 className="text-xl font-semibold mb-4">Project Management</h2>

      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-4 rounded mb-4">
        <div className="flex gap-2">
          <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className="border p-2 rounded flex-1 bg-white dark:bg-gray-900" />
          <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} className="border p-2 rounded">
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <button className="bg-blue-600 text-white px-4 rounded">{editingId ? 'Save' : 'Add'}</button>
        </div>

        <div className="mt-2">
          <textarea placeholder="Description" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} className="w-full border p-2 rounded bg-white dark:bg-gray-900" />
        </div>
      </form>

      <div className="space-y-2">
        {projects.map(p=>(
          <div key={p.id} className="bg-white dark:bg-gray-800 p-3 rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">{p.desc}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>startEdit(p)} className="px-2 py-1 border rounded">Inline Edit</button>
              <button onClick={()=>openDrawer(p)} className="px-2 py-1 border rounded">Drawer</button>
              <button onClick={()=>setConfirm({open:true,id:p.id})} className="px-2 py-1 border rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {drawerData && <DrawerEditor data={drawerData} onClose={()=>setDrawerData(null)} onSave={(d)=>{ setProjects(prev=>prev.map(p=>p.id===d.id?d:p)); setDrawerData(null)}} />}

      {confirm.open && <ModalConfirm message="Delete project?" onCancel={()=>setConfirm({open:false,id:null})} onConfirm={()=>deleteProject(confirm.id)} />}
    </div>
  )
}
