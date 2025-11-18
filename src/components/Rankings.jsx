import { useEffect, useState } from 'react'

function Rankings() {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${baseUrl}/api/rankings/top?limit=10`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <section className="py-10">
      <h2 className="text-xl font-semibold text-slate-200 mb-4">Top Vibe Index</h2>
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <p className="p-4 text-slate-400">No rankings yet.</p>
        ) : (
          <ul>
            {items.map((it, idx) => (
              <li key={it.id} className="flex items-center gap-4 p-4 border-b border-slate-700/60">
                <span className="w-8 text-slate-400">#{idx+1}</span>
                <img src={it.image_url} className="w-12 h-12 object-cover rounded-lg"/>
                <div className="flex-1">
                  <p className="text-slate-200 font-medium">@{it.username}</p>
                  <p className="text-slate-400 text-sm">{it.tags?.join(', ')}</p>
                </div>
                <div className="text-blue-300 font-semibold">{it.vibe_index?.toFixed?.(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Rankings
