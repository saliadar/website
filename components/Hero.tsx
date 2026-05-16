'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-white overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-0 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — text */}
        <div>
          <p className="text-xs font-semibold tracking-widest2 text-grey-3 uppercase mb-8 animate-fade-in">
            AI &amp; Marketing Consultant
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ink leading-[1.02] tracking-tight mb-8 animate-fade-up">
            I help businesses grow smarter with AI.
          </h1>
          <p className="text-lg text-grey-2 leading-relaxed max-w-lg mb-10 animate-fade-up animate-delay-100">
            I partner with ambitious founders and marketing teams to build AI-powered systems
            and Meta Ads strategies that drive real, measurable growth — not just vanity metrics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-200">
            <a
              href="#contact"
              className="px-7 py-3.5 bg-ink text-white text-sm font-medium rounded-full hover:bg-grey-1 transition-colors duration-200 text-center"
            >
              Let&apos;s talk
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 border border-grey-4 text-ink text-sm font-medium rounded-full hover:border-ink transition-colors duration-200 text-center"
            >
              See what I do
            </a>
          </div>
        </div>

        {/* Right — identity card */}
        <div className="relative hidden lg:flex justify-center animate-fade-in animate-delay-200">
          <div className="w-full max-w-sm border border-grey-5 rounded-2xl p-8 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden border border-grey-5 mb-6">
              <img src="/stuart.jpg" alt="Stuart Saliadarre" className="w-full h-full object-cover object-top" />
            </div>
            <h2 className="text-xl font-semibold text-ink mb-1">Stuart Saliadarre</h2>
            <p className="text-sm text-grey-3 mb-6">AI &amp; Marketing Consultant</p>
            <div className="space-y-3">
              {[
                'AI Strategy & Automation',
                'Facebook & Meta Ads',
                'Marketing Consulting',
              ].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                  <span className="text-sm text-grey-2">{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-grey-5 flex items-center justify-between">
              <span className="text-xs text-grey-3">Available for new projects</span>
              <span className="w-2 h-2 rounded-full bg-ink animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-grey-4">
        <div className="w-px h-10 bg-gradient-to-b from-grey-4 to-transparent" />
      </div>
    </section>
  );
}
