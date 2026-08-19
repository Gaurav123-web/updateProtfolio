import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Publications from '@/components/Publications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SkillsMarquee from '@/components/SkillsMarquee';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Aurora from '@/components/Aurora';

function App() {
  return (
    <div className="relative min-h-screen bg-[#05060a] text-[#e8edf7] overflow-x-hidden">
      <Aurora />
      <CustomCursor />
      <ScrollProgress />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SkillsMarquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Publications />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
