import React from 'react'

export default function Pagination({ total, page, perPage, onChange }){
  const pages = Math.max(1, Math.ceil(total / perPage))
  return (
    <div className="flex gap-2 items-center">
      <button onClick={()=>onChange(Math.max(1, page-1))} className="px-2 py-1 border rounded">Prev</button>
      <div>Page {page} / {pages}</div>
      <button onClick={()=>onChange(Math.min(pages, page+1))} className="px-2 py-1 border rounded">Next</button>
    </div>
  )
}
