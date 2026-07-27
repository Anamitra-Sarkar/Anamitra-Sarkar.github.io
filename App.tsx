import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Models } from './components/Models';
import { Engineering } from './components/Engineering';
import { Experience } from './components/Experience';
import { Playground } from './components/Playground';
import { Footer } from './components/Footer';
import { AmbientBackground } from './components/ui/AmbientBackground';
import Grain from './components/ui/Grain';
import Cursor from './components/ui/Cursor';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';
import { SelectionHighlighter } from './components/ui/SelectionHighlighter';
import { ParallaxSection } from './components/ui/ParallaxSection';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProvider } from './components/providers/ScrollProvider';
import { MouseProvider } from './components/providers/MouseProvider';
import { SelectionProvider, useSelection } from './components/providers/SelectionProvider';
import './components/ui/CustomScrollbar.css';

function AppContent() {
  const { stopSelecting, updateSelection } = useSelection();

  return (
    <div 
      className="w-full min-h-screen antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 relative transition-colors duration-500 cursor-none"
      onMouseUp={stopSelecting}
      onMouseMove={updateSelection}
    >
      <AmbientBackground />
      <Grain />
      <Cursor />
      <ScrollToTopButton />
      <SelectionHighlighter />
      
      {/* Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col bg-[#F4F3EF] dark:bg-[#0A0A0A]">
        <Navbar />
        <ParallaxSection speed={-0.05}>
          <div id="top">
            <Hero />
          </div>
        </ParallaxSection>
        <ParallaxSection speed={0.02}>
          <Services />
        </ParallaxSection>
        <ParallaxSection speed={0.02}>
          <Projects />
        </ParallaxSection>
        <ParallaxSection speed={0.02} className="mb-6">
          <Models />
        </ParallaxSection>
        <ParallaxSection speed={0.02}>
          <Playground />
        </ParallaxSection>
        <ParallaxSection speed={0.05}>
          <Engineering />
        </ParallaxSection>
        <ParallaxSection speed={0.02}>
          <Skills />
        </ParallaxSection>
        <ParallaxSection speed={0.02} className="mb-24">
          <Experience />
        </ParallaxSection>
        <Footer />
      </div>
    </div>
  )
}


function App() {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <MouseProvider>
          <SelectionProvider>
            <AppContent/>
          </SelectionProvider>
        </MouseProvider>
      </ScrollProvider>
    </ThemeProvider>
  );
}

export default App;
