import { profile } from '@/data/resume';

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-[#5eead4]">
          PW<span className="text-white">.</span>
        </p>
        <p className="text-xs text-[#8a93a8] text-center">
          © {new Date().getFullYear()} {profile.name}. Crafted with curiosity at the intersection of biology &amp; code.
        </p>
        <a href="#hero" className="text-xs text-[#8a93a8] hover:text-[#5eead4] transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
