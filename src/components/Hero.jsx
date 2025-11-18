import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center pb-12 px-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">Vibe Vision</h1>
            <p className="mt-4 text-slate-200/90 text-lg md:text-xl">Upload a photo, get instant style vibes, and discover people with a similar energy. Color palettes, contrast, warmth, and a 0–10 vibe index – no judgment, just aesthetics.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
