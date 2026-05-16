export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink border-t border-grey-1 py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-grey-3 text-sm font-medium">Stuart Saliadarre</span>
        <p className="text-grey-3 text-xs">&copy; {year} Stuart Saliadarre. All rights reserved.</p>
        <a href="mailto:saliadar@gmail.com" className="text-grey-3 text-sm hover:text-white transition-colors duration-200">
          saliadar@gmail.com
        </a>
      </div>
    </footer>
  );
}
