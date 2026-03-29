import React, { useEffect } from 'react';

export default function GlobalParticles() {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-global", {
        "particles": {
          "number": { "value": 50 },
          "color": { "value": "ffffff" },
          "shape": { "type": "circle" },
          "opacity": {
            "value": 0.5,
            "random": true
          },
          "size": {
            "value": 4,
            "random": true
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "out_mode": "out"
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" }
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": { "opacity": 1 }
            },
            "push": { "particles_nb": 4 }
          }
        },
        "retina_detect": true
      });
    }
  }, []);

  return (
    <div id="particles-global" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></div>
  );
}
