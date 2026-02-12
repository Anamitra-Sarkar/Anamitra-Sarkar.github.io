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
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen antialiased selection:bg-orange-100 selection:text-orange-900 dark:selection:bg-orange-900 dark:selection:text-orange-100 relative transition-colors duration-500">
        <AmbientBackground />
        
        {/* Content Wrapper to sit above the fixed background */}
        <div className="relative z-10 w-full flex flex-col">
          <Navbar />
          <div id="top">
            <Hero />
          </div>
          <Services />
          <Projects />
          <Models />
          <Playground />
          <Engineering />
          <Skills />
          <Experience />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;