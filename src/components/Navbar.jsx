import React, { useState, useEffect } from 'react';

const NavLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'tech-stack' },
  { name: 'Coding', id: 'coding-profiles' },
  { name: 'Journey', id: 'journey' },
  { name: 'Education', id: 'education' },
  { name: 'Upcoming', id: 'upcoming-projects' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Top navbar styling
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // ScrollSpy logic
      const sections = NavLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveLink(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-gray-800 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider cursor-pointer text-white">
          KM<span className="text-[#1DCD9F]">.</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6 items-center bg-[#111111] px-6 py-2.5 rounded-full border border-gray-800 shadow-md absolute left-1/2 transform -translate-x-1/2">
          {NavLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-sm font-medium transition-colors duration-300 relative ${
                activeLink === link.id ? 'text-[#1DCD9F]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {activeLink === link.id && (
                <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#1DCD9F] rounded-full"></span>
              )}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-[#1DCD9F] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#111111] border-b border-gray-800 transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col space-y-4 px-6 py-4">
          {NavLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors duration-300 ${
                activeLink === link.id ? 'text-[#1DCD9F]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
