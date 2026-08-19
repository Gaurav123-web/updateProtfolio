import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import useReveal from '@/hooks/useReveal';
import { testimonials } from '@/data/resume';
import TiltCard from '@/components/TiltCard';

export default function Testimonials() {
  const { ref, inView } = useReveal();

  return (
    <section id="testimonials" ref={ref} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-[#5eead4] mb-2">07 / Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold heading-line">What People Say</h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard max={8} className="glass-sheen rounded-2xl p-7 h-full spotlight relative overflow-hidden">
                <Quote
                  size={60}
                  className="absolute -top-2 -right-2 text-[#5eead4]/8"
                  fill="currentColor"
                />
                <div className="relative">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="text-[#5eead4]" fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-base text-[#c0c8d8] leading-relaxed italic">
                    "{t.quote}"
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#5eead4]/30"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#5eead4] border-2 border-[#05060a]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[#8a93a8] mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
