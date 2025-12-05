import React, { useEffect, useMemo, useState } from 'react'
import Topbar from '../components/Topbar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Pagination from '../shared/Pagination'
import DrawerEditor from '../shared/DrawerEditor'
import ModalConfirm from '../shared/ModalConfirm'

export default function Users(){
  const [users, setUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState({key:'name',dir:1})
  const [page, setPage] = useState(1)
  const perPage = 5

  // editing state
  const [editingId, setEditingId] = useState(null)
  const [drawerData, setDrawerData] = useState(null)
  const [confirm, setConfirm] = useState({open:false, id:null})

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users').then(r=>r.json()).then(data=>{
      setUsers(data)
      setAllUsers(data)
    })
  },[])

  const filtered = useMemo(()=>{
    let arr = allUsers.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
    arr = arr.sort((a,b)=>{
      const A = (a[sortBy.key]||'').toString().toLowerCase()
      const B = (b[sortBy.key]||'').toString().toLowerCase()
      if(A<B) return -1*sortBy.dir
      if(A>B) return 1*sortBy.dir
      return 0
    })
    return arr
  },[allUsers, query, sortBy])

  useEffect(()=> setUsers(filtered.slice((page-1)*perPage, page*perPage)), [filtered, page])

  function startInlineEdit(id){
    setEditingId(id)
  }

  function saveInline(id, field, value){
    setAllUsers(prev => prev.map(u => u.id===id ? {...u, [field]:value} : u))
    setEditingId(null)
  }

  function openDrawer(user){
    setDrawerData(user)
  }

  function closeDrawer(){
    setDrawerData(null)
  }

  function openConfirm(id){
    setConfirm({open:true,id})
  }

  function deleteUser(id){
    setAllUsers(prev => prev.filter(u=>u.id!==id))
    setConfirm({open:false,id:null})
  }

  return (
    <div>
      <Topbar />
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      <div className="flex gap-2 mb-4">
        <input placeholder="Search by name or email" value={query} onChange={e=>{setQuery(e.target.value); setPage(1)}} className="border p-2 rounded flex-1 bg-white dark:bg-gray-800" />
        <select value={sortBy.key} onChange={e=>setSortBy(s=>({...s,key:e.target.value}))} className="border p-2 rounded bg-white dark:bg-gray-800">
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <button onClick={()=>setSortBy(s=>({...s,dir:-s.dir}))} className="border p-2 rounded">Toggle ASC/DESC</button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded">
          <thead>
            <tr className="text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Company</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">
                  {editingId===u.id ? (
                    <input defaultValue={u.name} className="p-1 border rounded" onBlur={(e)=>saveInline(u.id,'name',e.target.value)} />
                  ) : (
                    u.name
                  )}
                </td>

                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.company?.name}</td>
                <td className="p-2 flex gap-2">
                  <button title="Inline edit" onClick={()=>startInlineEdit(u.id)} className="p-1"><EditIcon fontSize="small" /></button>
                  <button title="Drawer edit" onClick={()=>openDrawer(u)} className="p-1"><EditIcon fontSize="small" /></button>
                  <button title="Delete" onClick={()=>openConfirm(u.id)} className="p-1"><DeleteIcon fontSize="small" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination total={filtered.length} page={page} perPage={perPage} onChange={setPage} />
      </div>

      {drawerData && <DrawerEditor data={drawerData} onClose={closeDrawer} onSave={(d)=>{ setAllUsers(prev=>prev.map(u=>u.id===d.id?d:u)); closeDrawer() }} />}

      {confirm.open && <ModalConfirm message="Delete this user?" onCancel={()=>setConfirm({open:false,id:null})} onConfirm={()=>deleteUser(confirm.id)} />}
    </div>
  )
}
