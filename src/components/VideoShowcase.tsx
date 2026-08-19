import { motion } from 'framer-motion';
import { Play, Dna } from 'lucide-react';
import useReveal from '@/hooks/useReveal';

export default function VideoShowcase() {
  const { ref, inView } = useReveal();

  return (
    <section id="showcase" ref={ref} className="relative py-28 px-6 bg-[#0a0d14]/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm text-[#5eead4] mb-2 flex items-center justify-center gap-2">
            <Dna size={14} /> 06 / Featured
          </p>
          <h2 className="text-4xl md:text-5xl font-bold heading-line inline-block">
            Research in Action
          </h2>
          <p className="mt-5 text-lg text-[#8a93a8] max-w-2xl mx-auto">
            A glimpse into the molecular and computational workflows behind the science.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden glass-sheen p-2 glow-accent group"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#05060a]">
            <video
              src="/testimonials/video1.mp4"
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
            />
            {/* Decorative overlay frame */}
            <div className="absolute inset-0 pointer-events-none border border-[#5eead4]/10 rounded-2xl" />
          </div>
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#5eead4]/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#5eead4]/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#5eead4]/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#5eead4]/40 rounded-br-lg" />
        </motion.div>

        {/* Decorative play hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-[#8a93a8]"
        >
          <Play size={14} className="text-[#5eead4]" fill="currentColor" />
          <span>Press play to watch</span>
        </motion.div>
      </div>
    </section>
  );
}
