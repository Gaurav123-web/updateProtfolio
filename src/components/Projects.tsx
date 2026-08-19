import { motion } from 'framer-motion';
import { Beaker, ArrowUpRight } from 'lucide-react';
import useReveal from '@/hooks/useReveal';
import useCounter from '@/hooks/useCounter';
import { projects } from '@/data/resume';
import TiltCard from '@/components/TiltCard';

const tagColors: Record<string, string> = {
  'Cell Biology': '#5eead4',
  'Model Organism': '#38bdf8',
  'Bioinformatics': '#a78bfa',
  'Microbiome': '#5eead4',
  'Metaproteomics': '#f59e0b',
};

function StatsCard() {
  const { ref, value } = useCounter(1000, 2200);
  return (
    <TiltCard max={8} className="glass-sheen rounded-2xl p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#5eead4]/8 to-transparent h-full">
      <p className="text-5xl font-bold gradient-text-animated">
        ~<span ref={ref}>{value.toLocaleString()}</span>
      </p>
      <p className="text-sm text-[#8a93a8] mt-3 max-w-[180px]">
        microbiome samples analysed with R &amp; phyloseq
      </p>
    </TiltCard>
  );
}

export default function Projects() {
  const { ref, inView } = useReveal();

  return (
    <section id="projects" ref={ref} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-[#5eead4] mb-2">03 / Research</p>
          <h2 className="text-4xl md:text-5xl font-bold heading-line">Academic Projects</h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {projects.map((p, i) => {
            const color = tagColors[p.tag] || '#5eead4';
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <TiltCard max={10} className="group glass-sheen rounded-2xl p-6 h-full relative overflow-hidden spotlight">
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-5 group-hover:opacity-15 transition-all duration-500 blur-xl"
                    style={{ background: color }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${color}15` }}
                      >
                        <Beaker size={18} style={{ color }} />
                      </div>
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full bg-[#05060a]/60 border whitespace-nowrap"
                        style={{ color, borderColor: `${color}30` }}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#5eead4] transition-colors pr-6 relative">
                      {p.title}
                      <ArrowUpRight
                        size={16}
                        className="absolute top-0 right-0 text-[#8a93a8] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </h3>
                    <p className="mt-3 text-sm text-[#8a93a8] leading-relaxed">{p.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: projects.length * 0.1 }}
          >
            <StatsCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
