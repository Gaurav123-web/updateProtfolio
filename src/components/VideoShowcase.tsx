import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon, Video } from 'lucide-react';
import useReveal from '@/hooks/useReveal';

type MediaItem = {
  type: 'image' | 'video';
  src: string;
  caption: string;
};

const media: MediaItem[] = [
  { type: 'image', src: '/testimonials/pic1.jpeg', caption: 'Dr. Bhavana Prasher — Thesis Supervisor, CSIR–IGIB' },
  { type: 'image', src: '/testimonials/pic2.jpeg', caption: 'Dr. Sudipta Tung — Principal Investigator, Ashoka University' },
  { type: 'video', src: '/testimonials/video1.mp4', caption: 'Research in action — molecular & computational workflows' },
  { type: 'image', src: '/testimonials/pic3.jpeg', caption: 'Lab collaboration — Ashoka University' },
  { type: 'image', src: '/testimonials/pic4.jpeg', caption: 'Bioinformatics project mentor' },
  { type: 'video', src: '/testimonials/video2.mp4', caption: 'Field & lab highlights' },
];

const SLIDE_DURATION = 5000;

export default function VideoShowcase() {
  const { ref, inView } = useReveal();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => setIndex((p) => (p + 1) % media.length), []);
  const prev = useCallback(() => setIndex((p) => (p - 1 + media.length) % media.length), []);

  const goTo = useCallback((i: number) => setIndex(i), []);

  // Auto-advance
  useEffect(() => {
    if (paused || !inView) return;

    const current = media[index];
    // If it's a video, let it play and advance when it ends
    if (current.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      const onEnded = () => next();
      videoRef.current.addEventListener('ended', onEnded);
      return () => {
        videoRef.current?.removeEventListener('ended', onEnded);
        videoRef.current?.pause();
      };
    }

    // Images: timer-based
    timerRef.current = setTimeout(() => next(), SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, inView, next]);

  // Pause video when switching away
  useEffect(() => {
    if (media[index].type !== 'video' && videoRef.current) {
      videoRef.current.pause();
    }
  }, [index]);

  const current = media[index];

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
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slide area */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#05060a]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {current.type === 'image' ? (
                  <img
                    src={current.src}
                    alt={current.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={current.src}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    playsInline
                    muted
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay for caption readability */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#05060a]/90 to-transparent pointer-events-none" />

            {/* Caption */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#5eead4]/15 backdrop-blur-sm flex items-center gap-1.5 text-xs text-[#5eead4] font-mono">
                {current.type === 'image' ? <ImageIcon size={11} /> : <Video size={11} />}
                {current.type}
              </span>
              <span className="text-sm text-white/90 truncate">{current.caption}</span>
            </div>

            {/* Frame border */}
            <div className="absolute inset-0 pointer-events-none border border-[#5eead4]/10 rounded-2xl" />

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#5eead4]/40 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#5eead4]/40 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#5eead4]/40 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#5eead4]/40 rounded-br-lg pointer-events-none" />
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-sheen flex items-center justify-center text-white hover:bg-[#5eead4] hover:text-[#05060a] transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-sheen flex items-center justify-center text-white hover:bg-[#5eead4] hover:text-[#05060a] transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>

        {/* Controls row */}
        <div className="mt-6 flex items-center justify-between gap-4">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="group/dot relative"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-8 h-2 bg-[#5eead4]'
                      : 'w-2 h-2 bg-[#8a93a8]/30 hover:bg-[#8a93a8]/60'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Pause/play indicator */}
          <div className="flex items-center gap-2 text-xs text-[#8a93a8] font-mono">
            {paused ? (
              <>
                <Pause size={12} className="text-[#5eead4]" fill="currentColor" /> Paused
              </>
            ) : (
              <>
                <Play size={12} className="text-[#5eead4]" fill="currentColor" /> Auto-playing
              </>
            )}
            <span className="text-[#8a93a8]/50">·</span>
            <span>{index + 1} / {media.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
