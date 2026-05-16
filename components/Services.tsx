const services = [
  {
    number: '01',
    title: 'AI Strategy & Consulting',
    description:
      'From AI readiness audits to full implementation roadmaps, I help you identify where artificial intelligence creates the most leverage in your business — then build it.',
    deliverables: ['AI Opportunity Audit', 'Implementation Roadmap', 'Tool Selection & Setup', 'Team Enablement'],
  },
  {
    number: '02',
    title: 'Facebook & Meta Ads',
    description:
      'Performance campaigns built around your actual business goals. I handle strategy, creative direction, audience targeting, and ongoing optimisation to maximise ROAS.',
    deliverables: ['Campaign Strategy', 'Creative Briefing', 'Audience & Targeting', 'Weekly Optimisation'],
  },
  {
    number: '03',
    title: 'Marketing Consulting',
    description:
      'Fractional CMO-style support for founders who need senior marketing thinking without a full-time hire. Strategy, positioning, channel mix, and execution oversight.',
    deliverables: ['Go-to-Market Strategy', 'Brand Positioning', 'Channel Planning', 'Growth Frameworks'],
  },
  {
    number: '04',
    title: 'Marketing Automation',
    description:
      'I connect your marketing stack using AI-powered workflows that nurture leads, personalise outreach, and convert prospects — without adding headcount.',
    deliverables: ['Workflow Design', 'CRM Integration', 'AI Personalisation', 'Performance Dashboards'],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-grey-6 border-t border-grey-5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-widest2 text-grey-3 uppercase mb-4">Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight max-w-md">
              How I can help your business.
            </h2>
          </div>
          <p className="text-grey-2 text-base max-w-sm leading-relaxed lg:text-right">
            Every engagement is bespoke. I don&apos;t sell packages — I solve problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-grey-5">
          {services.map((s) => (
            <div
              key={s.number}
              className="bg-white p-8 lg:p-10 group hover:bg-grey-6 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs font-semibold text-grey-4 tracking-widest">{s.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-ink mb-4 leading-snug">{s.title}</h3>
              <p className="text-grey-2 text-sm leading-relaxed mb-8">{s.description}</p>
              <div className="space-y-2">
                {s.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-grey-3 shrink-0" />
                    <span className="text-xs text-grey-3 font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
