export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-dark-300 text-sm">
          Data powered by{' '}
          <a
            href="https://wakatime.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:text-white transition-colors duration-300"
          >
            WakaTime
          </a>
        </p>
        <p className="text-dark-300 text-sm">
          Made by{' '}
          <a
            href="https://github.com/bcsaalinas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:text-white transition-colors duration-300 relative group"
          >
            bcsaalinas
            <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </p>
      </div>
    </footer>
  );
}
