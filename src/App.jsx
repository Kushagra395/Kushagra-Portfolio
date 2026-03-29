import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import CodingProfiles from './components/CodingProfiles';
import UpcomingProjects from './components/UpcomingProjects';
import Contact from './components/Contact';
import GlobalParticles from './components/GlobalParticles';

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      const progressBar = document.getElementById("scroll-indicator");
      if (progressBar) {
        progressBar.style.height = `${scrollPercent}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans relative">
      <GlobalParticles />
      {/* Scroll Progress Bar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 h-64 w-1.5 bg-gray-700 rounded-full z-50 hidden sm:block">
        <div id="scroll-indicator" className="bg-[#1DCD9F] h-0 w-full rounded-full transition-all duration-300 ease-out shadow-md shadow-[#1DCD9F]"></div>
      </div>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <CodingProfiles />
      <Journey />
      <Education />
      <UpcomingProjects />
      <Contact />
    </div>
  );
}
