import { motion } from 'framer-motion';
import { FileText, Award, HandHeart, GraduationCap, Quote } from 'lucide-react';
import useReveal from '@/hooks/useReveal';
import { publications, awards, engagement, workshops, recommendations } from '@/data/resume';

export default function Publications() {
  const { ref, inView } = useReveal();

  return (
    <section id="publications" ref={ref} className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-[#5eead4] mb-2">05 / Output</p>
          <h2 className="text-4xl md:text-5xl font-bold heading-line">Publications &amp; Recognition</h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10">
          {/* Publications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-5">
              <FileText size={18} className="text-[#5eead4]" /> Publications &amp; Scientific Communication
            </h3>
            <div className="space-y-4">
              {publications.map((pub, i) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="glass-sheen rounded-xl p-5 hover:border-[#5eead4]/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5eead4] to-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm font-medium text-white leading-snug">{pub.title}</p>
                  <p className="text-xs text-[#5eead4] mt-2 font-mono">{pub.authors} — {pub.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards + Engagement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-5">
                <Award size={18} className="text-[#5eead4]" /> Honours &amp; Awards
              </h3>
              <div className="space-y-3">
                {awards.map((a, i) => (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="glass-sheen rounded-xl p-4 flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#5eead4]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Award size={14} className="text-[#5eead4]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{a.title}</p>
                      <p className="text-xs text-[#8a93a8] mt-1">{a.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-5">
                <HandHeart size={18} className="text-[#5eead4]" /> Academic Service &amp; Engagement
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {engagement.map((e, i) => (
                  <motion.div
                    key={e.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="glass-sheen rounded-xl p-4 hover:border-[#5eead4]/30 transition-all"
                  >
                    <p className="text-sm font-medium text-white">{e.title}</p>
                    <p className="text-xs text-[#8a93a8] mt-1">{e.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Workshops + Recommendations */}
        <div className="mt-10 grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-5">
              <GraduationCap size={18} className="text-[#5eead4]" /> Workshops &amp; Training
            </h3>
            <div className="space-y-3">
              {workshops.map((w, i) => (
                <motion.div
                  key={w}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex items-start gap-3 text-sm text-[#8a93a8] group"
                >
                  <span className="w-6 h-6 rounded-full bg-[#38bdf8]/10 flex items-center justify-center shrink-0 group-hover:bg-[#38bdf8]/20 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                  </span>
                  <span className="pt-0.5">{w}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-5">
              <Quote size={18} className="text-[#5eead4]" /> Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-sheen rounded-xl p-5 hover:border-[#5eead4]/30 transition-all"
                >
                  <p className="text-sm font-medium text-white">{r.name}</p>
                  <p className="text-xs text-[#8a93a8] mt-1">{r.org}</p>
                  <a href={`mailto:${r.email}`} className="text-xs text-[#5eead4] mt-2 inline-block hover:underline">
                    {r.email}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
