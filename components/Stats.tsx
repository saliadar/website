const stats = [
  { value: '50+', label: 'Clients worked with' },
  { value: '10x', label: 'Average ROI delivered' },
  { value: '$2M+', label: 'Ad spend managed' },
  { value: '5 yrs', label: 'In AI & digital marketing' },
];

export default function Stats() {
  return (
    <section id="results" className="py-24 lg:py-32 border-t border-grey-5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <p className="text-xs font-semibold tracking-widest2 text-grey-3 uppercase mb-16">Results</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl lg:text-5xl font-bold text-ink mb-3 tracking-tight">{s.value}</div>
              <div className="text-sm text-grey-3 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
