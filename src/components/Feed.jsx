import { useEffect, useState } from 'react'

function Card({ item }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
      <div className="aspect-square bg-slate-900/60">
        <img src={item.image_url} alt="post" className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400" />
            <div>
              <p className="text-slate-200 font-semibold">@{item.username}</p>
              <p className="text-slate-400 text-sm">Vibe {item.vibe_index?.toFixed?.(2)}</p>
            </div>
          </div>
          <div className="flex -space-x-1">
            {item.palette?.slice(0,5).map((c, i) => (
              <span key={i} style={{ backgroundColor: c }} className="w-6 h-6 rounded-full border border-slate-900" />
            ))}
          </div>
        </div>
        {item.caption && <p className="text-slate-300 text-sm">{item.caption}</p>}
        <div className="flex flex-wrap gap-2">
          {item.tags?.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-slate-300">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Feed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/posts?sort=top`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-200">Public Feed</h2>
        <button onClick={load} className="text-sm text-blue-400 hover:text-blue-300">Refresh</button>
      </div>
      {loading ? (
        <p className="text-slate-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-slate-400">No posts yet. Be the first!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => <Card key={it.id} item={it} />)}
        </div>
      )}
    </section>
  )
}

export default Feed
