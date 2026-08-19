import { motion } from 'framer-motion';
import { Dna, Code2, TestTube, Stethoscope } from 'lucide-react';
import useReveal from '@/hooks/useReveal';
import { skills } from '@/data/resume';
import TiltCard from '@/components/TiltCard';

const categories = [
  { key: 'Molecular Biology & Microbiology', icon: TestTube, items: skills.molecular, color: '#5eead4' },
  { key: 'Genomics & Bioinformatics', icon: Dna, items: skills.bioinformatics, color: '#38bdf8' },
  { key: 'Programming & Data Analysis', icon: Code2, items: skills.programming, color: '#a78bfa' },
  { key: 'Clinical & Public Health Research', icon: Stethoscope, items: skills.clinical, color: '#f59e0b' },
];

export default function Skills() {
  const { ref, inView } = useReveal();

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 bg-[#0a0d14]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-[#5eead4] mb-2">04 / Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold heading-line">Technical Expertise</h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard max={6} className="glass-sheen rounded-2xl p-6 h-full spotlight">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${cat.color}15`, boxShadow: `0 0 20px -5px ${cat.color}40` }}
                  >
                    <cat.icon size={18} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-base font-semibold text-white">{cat.key}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, idx) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + idx * 0.03 }}
                      className="chip px-3 py-1.5 rounded-lg text-xs text-[#c0c8d8] bg-[#05060a]/60 border border-white/5 hover:border-[#5eead4]/30 hover:text-white cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
