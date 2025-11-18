import { useState } from 'react'

function UploadCard({ onCreate }) {
  const [imageUrl, setImageUrl] = useState('')
  const [username, setUsername] = useState('guest')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!imageUrl) {
      setError('Please paste an image URL')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, image_url: imageUrl, caption, public: true })
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Failed')
      }
      const data = await res.json()
      onCreate?.(data)
      setImageUrl('')
      setCaption('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="md:col-span-1 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="Paste image URL (https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="md:col-span-2 w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button disabled={loading} className="md:col-span-1 w-full rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold px-4 py-2 transition">
            {loading ? 'Analyzing…' : 'Post & Analyze'}
          </button>
        </div>
        <input
          type="text"
          placeholder="optional caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  )
}

export default UploadCard
