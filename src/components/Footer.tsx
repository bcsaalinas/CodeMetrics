export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-dark-300 text-xs font-mono tracking-wide flex items-center gap-3">
          <span className="text-accent-cyan/40">{'<'}/{'>'}</span>
          <span>
            built by{' '}
            <a
              href="https://github.com/bcsaalinas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-100 hover:text-accent-cyan transition-colors duration-300"
            >
              bcsaalinas
            </a>
          </span>
          <span className="text-dark-400">&#183;</span>
          <span>
            data via{' '}
            <a
              href="https://wakatime.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-100 hover:text-accent-cyan transition-colors duration-300"
            >
              wakatime
            </a>
          </span>
        </p>
        <p className="text-dark-400 text-[10px] font-mono tracking-wider uppercase">
          CodeMetrics
        </p>
      </div>
    </footer>
  );
}
