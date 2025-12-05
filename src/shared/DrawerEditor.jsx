import React, { useState } from 'react'

export default function DrawerEditor({ data, onClose, onSave }){
  const [form, setForm] = useState(data)

  function save(){
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-96 bg-white dark:bg-gray-800 p-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">Edit</h3>
        <input className="border p-2 w-full rounded mb-2 bg-white dark:bg-gray-900" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <textarea className="border p-2 w-full rounded mb-2 bg-white dark:bg-gray-900" value={form.desc || ''} onChange={e=>setForm({...form, desc:e.target.value})} />
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={save}>Save</button>
          <button className="px-3 py-1 border rounded" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
