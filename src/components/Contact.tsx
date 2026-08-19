import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Globe, Send } from 'lucide-react';
import useReveal from '@/hooks/useReveal';
import { profile } from '@/data/resume';

export default function Contact() {
  const { ref, inView } = useReveal();

  const contacts = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'Profile', href: profile.linkedin },
    { icon: Github, label: 'GitHub', value: 'Profile', href: profile.github },
    { icon: Globe, label: 'Website', value: 'Personal Site', href: profile.website },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6 bg-[#0a0d14]/50">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm text-[#5eead4] mb-2">06 / Contact</p>
          <h2 className="text-4xl md:text-6xl font-bold">
            Let's advance <span className="gradient-text-animated">science</span> together
          </h2>
          <p className="mt-5 text-lg text-[#8a93a8] max-w-2xl mx-auto">
            Open to research collaborations, opportunities in genomics &amp; microbiome science, and interdisciplinary projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass-sheen rounded-2xl p-5 flex flex-col items-center gap-3 hover:glow-accent hover:scale-105 hover:border-[#5eead4]/40 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#5eead4]/10 flex items-center justify-center group-hover:bg-[#5eead4]/20 group-hover:rotate-6 transition-all duration-300">
                <c.icon size={18} className="text-[#5eead4]" />
              </div>
              <div>
                <p className="text-xs text-[#8a93a8]">{c.label}</p>
                <p className="text-sm text-white mt-0.5 truncate max-w-[160px]">{c.value}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#5eead4] text-[#05060a] font-medium hover:bg-white transition-colors duration-300 glow-strong group"
        >
          <Send size={16} className="group-hover:translate-x-0.5 transition-transform" /> Send a message
        </motion.a>
      </div>
    </section>
  );
}
