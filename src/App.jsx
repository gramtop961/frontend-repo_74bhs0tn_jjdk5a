import Hero from './components/Hero'
import UploadCard from './components/UploadCard'
import Feed from './components/Feed'
import Rankings from './components/Rankings'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <Hero />
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 -mt-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <UploadCard onCreate={() => { /* no-op: feed auto refresh via button */ }} />
            <Feed />
          </div>
          <div className="md:col-span-1">
            <Rankings />
          </div>
        </div>
        <footer className="py-10 text-center text-slate-500 text-sm">
          Built with visual, non-judgmental analysis. Paste any image URL to get instant vibes.
        </footer>
      </main>
    </div>
  )
}

export default App
