import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => document.querySelector(l.href));
      const mid = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= mid) {
          setActive(links[i].href);
          return;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-mono text-sm tracking-widest text-[#5eead4] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#5eead4] glow-accent" />
          PW<span className="text-white">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors relative group ${
                active === l.href ? 'text-white' : 'text-[#8a93a8] hover:text-white'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#5eead4] transition-all duration-300 ${
                  active === l.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm px-4 py-2 rounded-full border border-[#5eead4]/40 text-[#5eead4] hover:bg-[#5eead4] hover:text-[#05060a] transition-all duration-300"
          >
            Get in touch
          </a>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden glass mt-3 mx-4 rounded-xl p-5 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm ${active === l.href ? 'text-[#5eead4]' : 'text-[#8a93a8] hover:text-white'}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
