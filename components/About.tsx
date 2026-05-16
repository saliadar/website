export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-grey-5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs font-semibold tracking-widest2 text-grey-3 uppercase mb-6">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink leading-tight tracking-tight mb-0">
            The thinking behind the work.
          </h2>
        </div>
        <div className="space-y-5 text-grey-2 text-base leading-relaxed">
          <p>
            I&apos;ve spent years at the intersection of technology and marketing — helping businesses
            cut through the noise and build growth engines that compound over time.
          </p>
          <p>
            My approach is simple: identify where AI and smart paid media can create the biggest
            leverage for your business, then execute with precision. No bloated retainers,
            no generic playbooks — just tailored strategy and hands-on delivery.
          </p>
          <p>
            Whether you&apos;re looking to automate your marketing workflows, launch a high-ROI
            Meta Ads campaign, or build an AI roadmap for your team, I work as a true
            extension of your business.
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink border-b border-ink pb-0.5 hover:opacity-60 transition-opacity duration-200"
            >
              Start a conversation
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
