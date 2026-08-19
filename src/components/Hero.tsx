import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Phone, MapPin, Download } from 'lucide-react';
import Scene3D from './Scene3D';
import { profile } from '@/data/resume';
import useTypewriter from '@/hooks/useTypewriter';

export default function Hero() {
  const { displayed, done } = useTypewriter(profile.title, 55, 600);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-bg-animate">
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#05060a]" />}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#05060a]/50 via-transparent to-[#05060a]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#05060a]/85 via-[#05060a]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6"
          >
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#5eead4] animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-[#5eead4]" />
            </span>
            <span className="text-xs font-mono text-[#8a93a8]">Available for research opportunities</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-sm text-[#5eead4] mb-3 tracking-wider"
          >
            GENOMICS · GUT MICROBIOME · BIOINFORMATICS
          </motion.p>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-block"
            >
              {profile.name.split(' ')[0]}
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="inline-block gradient-text-animated"
            >
              {profile.name.split(' ').slice(1).join(' ')}
            </motion.span>
          </h1>

          <p className={`mt-5 text-xl md:text-2xl text-[#c0c8d8] font-light min-h-[2rem] ${!done ? 'typewriter-caret' : ''}`}>
            {displayed}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 text-base text-[#8a93a8]/80 max-w-xl leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="magnetic-btn px-6 py-3 rounded-full bg-[#5eead4] text-[#05060a] font-medium hover:bg-white transition-colors duration-300 glow-strong"
            >
              Let's collaborate
            </a>
            <a
              href="#experience"
              className="px-6 py-3 rounded-full border border-[#5eead4]/30 text-white hover:border-[#5eead4] hover:bg-[#5eead4]/5 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={15} /> View research
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap gap-6 text-sm text-[#8a93a8]"
          >
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-[#5eead4] transition-colors">
              <Mail size={14} className="text-[#5eead4]" /> {profile.email}
            </a>
            <span className="flex items-center gap-2"><Phone size={14} className="text-[#5eead4]" /> {profile.phone}</span>
            <span className="flex items-center gap-2"><MapPin size={14} className="text-[#5eead4]" /> {profile.location}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-[#8a93a8] tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#5eead4] to-transparent" />
      </motion.div>
    </section>
  );
}
