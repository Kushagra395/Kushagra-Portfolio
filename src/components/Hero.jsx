import React, { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function Hero() {
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    // 1. Glow effect after 1 second (stays on until scrolled down)
    const glowTimer = setTimeout(() => {
      setIsGlowing(true);
    }, 1000);

    // 2. Auto scroll to About section after 5 seconds if not scrolled
    const scrollTimer = setTimeout(() => {
      if (window.scrollY < 50) {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 5000);

    // 3. Turn off glowing effect when user reaches About section
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        // Stop glowing when we're roughly looking at the About section
        if (window.scrollY > aboutSection.offsetTop - window.innerHeight / 2) {
          setIsGlowing(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(glowTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-hero", {
        "particles": {
          "number": {
            "value": 200,
            "density": { "enable": true, "value_area": 800 }
          },
          "color": { "value": "#ffffff" },
          "opacity": { "value": 0.7, "random": false },
          "size": { "value": 4, "random": true },
          "line_linked": { "enable": false },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "bottom",
            "out_mode": "out"
          }
        },
        "interactivity": {
          "events": {
            "onhover": { "enable": false },
            "onclick": { "enable": false }
          }
        },
        "retina_detect": true
      });
    }
  }, []);

  useGSAP(() => {
    gsap.from(".hero-left", {
      opacity: 0,
      x: -50,
      duration: 0.2,
      ease: "power3.out",
    });
    
    gsap.from(".hero-right", {
      opacity: 0,
      x: 50,
      duration: 0.2,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  return (
    <section id="home" className="position-relative container-fluid min-vh-100 d-flex justify-content-center align-items-center text-white overflow-hidden" style={{ backgroundColor: "#000000" }}>
      {/* Hero Particle Background */}
      <div id="particles-hero" className="position-absolute w-100 h-100 top-0 start-0" style={{ zIndex: 0 }}></div>

      {/* Hero Content */}
      <div className="container text-center position-relative" style={{ zIndex: 1 }}>
        <h1 className="display-4 fw-bold">
          <span className="text-white me-2">Hi, I'm</span>
          <button className={`button ${isGlowing ? 'force-hover' : ''}`} data-text="Kushagra">
            <span className="actual-text">&nbsp;Kushagra&nbsp;</span>
            <span aria-hidden="true" className="hover-text">&nbsp;Kushagra&nbsp;</span>
          </button>
        </h1>
        <p className="lead text-light mt-3">
          An aspiring Full Stack Developer and UI/UX Designer passionate about building responsive and design-driven web applications
        </p>

      </div>
    </section>
  );
}
