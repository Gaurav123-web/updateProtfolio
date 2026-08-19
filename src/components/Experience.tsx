import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronRight, FlaskConical, Users, Clock } from 'lucide-react';
import useReveal from '@/hooks/useReveal';
import { experience, leadership } from '@/data/resume';

type Tab = 'research' | 'leadership';

export default function Experience() {
  const { ref, inView } = useReveal();
  const [tab, setTab] = useState<Tab>('research');
  const list = tab === 'research' ? experience : leadership;

  return (
    <section id="experience" ref={ref} className="relative py-28 px-6 bg-[#0a0d14]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-[#5eead4] mb-2">02 / Experience</p>
          <h2 className="text-4xl md:text-5xl font-bold heading-line">Research Journey</h2>
        </motion.div>

        <div className="mt-10 flex gap-2">
          <button
            onClick={() => setTab('research')}
            className={`px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ${
              tab === 'research'
                ? 'bg-[#5eead4] text-[#05060a] glow-accent'
                : 'glass text-[#8a93a8] hover:text-white'
            }`}
          >
            <FlaskConical size={15} /> Research
          </button>
          <button
            onClick={() => setTab('leadership')}
            className={`px-5 py-2 rounded-full text-sm flex items-center gap-2 transition-all duration-300 ${
              tab === 'leadership'
                ? 'bg-[#5eead4] text-[#05060a] glow-accent'
                : 'glass text-[#8a93a8] hover:text-white'
            }`}
          >
            <Users size={15} /> Leadership
          </button>
        </div>

        <div className="mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#5eead4]/40 via-[#38bdf8]/20 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {list.map((item, i) => (
                <motion.div
                  key={item.role + i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative pl-10 group"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#05060a] border-2 border-[#5eead4] flex items-center justify-center group-hover:scale-125 group-hover:glow-accent transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5eead4]" />
                  </div>

                  <div className="glass-sheen rounded-2xl p-6 hover:translate-x-1.5 transition-transform duration-300 spotlight">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white leading-snug">{item.role}</h3>
                        <p className="text-sm text-[#5eead4] mt-1 flex items-center gap-2">
                          <Briefcase size={13} /> {item.org}
                        </p>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#5eead4]/10 text-[#5eead4] whitespace-nowrap flex items-center gap-1.5">
                        <Clock size={10} />
                        {item.period}
                        {'partTime' in item && item.partTime ? ' · PT' : ''}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {item.points.map((p, j) => (
                        <li key={j} className="text-sm text-[#8a93a8] flex gap-2 leading-relaxed">
                          <ChevronRight size={14} className="text-[#38bdf8] mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
