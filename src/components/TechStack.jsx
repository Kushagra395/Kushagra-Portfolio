import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  useGSAP(() => {
    gsap.fromTo("#tech-stack h2", 
      { opacity: 0, y: -40 },
      {
        scrollTrigger: {
          trigger: "#tech-stack",
          start: "top 75%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );
    
    // Animate categories one by one
    gsap.utils.toArray(".tech-category").forEach((section) => {
      // Heading
      gsap.fromTo(section.querySelector('.category-label'), 
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          x: 0,
          duration: 0.6
        }
      );

      // Individual tech items staggered within this category
      const items = section.querySelectorAll(".group");
      gsap.fromTo(items, 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out"
        }
      );
    });
  }, []);

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tech-stack" className="relative z-10 text-white py-20 pb-30 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* FRONTEND */}
        <div className="flex md:flex-row flex-col gap-8 items-start tech-category" id="frontend">
          <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
            <div className="category-label cursor-pointer hover:text-white transition" onClick={() => scrollToSection('#frontend')}>FRONTEND</div>
          </div>
          <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-6 h-6" alt="JS" /><span className="text-lg">Javascript</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-6 h-6" alt="React" /><span className="text-lg">React</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" className="w-6 h-6" alt="Tailwind" /><span className="text-lg">Tailwind CSS</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-6 h-6" alt="HTML" /><span className="text-lg">HTML</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-6 h-6" alt="CSS" /><span className="text-lg">CSS</span></div>
            <div className="flex items-center gap-2 group"><i className="fas fa-wave-square"></i><span className="text-lg">GSAP</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" className="w-6 h-6" alt="C" /><span className="text-lg">C</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" className="w-6 h-6" alt="C++" /><span className="text-lg">C++</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-6 h-6" alt="Python" /><span className="text-lg">Python</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" className="w-6 h-6" alt="Bootstrap" /><span className="text-lg">Bootstrap</span></div>
          </div>
        </div>

        {/* BACKEND */}
        <div className="flex md:flex-row flex-col gap-8 items-start tech-category" id="backend">
          <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
            <div className="category-label cursor-pointer hover:text-white transition" onClick={() => scrollToSection('#backend')}>BACKEND</div>
          </div>
          <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-6 h-6" alt="Node" /><span className="text-lg">Node.js</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" className="w-6 h-6 bg-white rounded-full p-0.5" alt="Next" /><span className="text-lg">Next.js</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="w-6 h-6 bg-white rounded p-0.5" alt="Express" /><span className="text-lg">Express.js</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg" className="w-6 h-6" alt="React Router" /><span className="text-lg">React Router</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodemon/nodemon-original.svg" className="w-6 h-6" alt="Nodemon" /><span className="text-lg">Nodemon</span></div>
            {/* Added Firebase */}
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" className="w-6 h-6" alt="Firebase" /><span className="text-lg">Firebase</span></div>
          </div>
        </div>

        {/* DATABASE */}
        <div className="flex md:flex-row flex-col gap-8 items-start tech-category" id="database">
          <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
            <div className="category-label cursor-pointer hover:text-white transition" onClick={() => scrollToSection('#database')}>DATABASE</div>
          </div>
          <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" className="w-6 h-6" alt="Mongoose" /><span className="text-lg">Mongoose</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-6 h-6" alt="MongoDB" /><span className="text-lg">MongoDB</span></div>
           <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" className="w-6 h-6" alt="PostgreSQL" /><span className="text-lg">PostgreSQL</span></div>
          </div>
        </div>

        {/* TOOLS */}
        <div className="flex md:flex-row flex-col gap-8 items-start tech-category" id="tools">
          <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
            <div className="category-label cursor-pointer hover:text-white transition" onClick={() => scrollToSection('#tools')}>TOOLS</div>
          </div>
          <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" className="w-6 h-6" alt="Git" /><span className="text-lg">Git</span></div>
            <div className="flex items-center gap-2 group"><img src="/assets/Github-logo.png" className="w-6 h-6" alt="GitHub" /><span className="text-lg">GitHub</span></div>
            <div className="flex items-center gap-2 group"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" className="w-6 h-6" alt="GCP" /><span className="text-lg">Google Cloud</span></div>
            <div className="flex items-center gap-2 group"><img src=" /assets/postman.png" className="w-6 h-6" alt="Postman" /><span className="text-lg">Postman</span></div>
          </div>
        </div>
        
        {/* UI/UX TOOLS */}
        <div className="flex md:flex-row flex-col gap-8 items-start tech-category" id="uiux">
          <div className="w-full md:w-1/5 text-gray-400 text-lg font-bold sticky top-18">
            <div className="category-label cursor-pointer hover:text-white transition" onClick={() => scrollToSection('#uiux')}>UI/UX TOOLS</div>
          </div>
          <div className="w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 reveal-section">
            <div className="flex items-center gap-2 group">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" className="w-6 h-6" alt="Figma" />
              <span className="text-lg">Figma</span>
            </div>
            <div className="flex items-center gap-2 group">
              <img src="/assets/canva.svg" className="w-6 h-6" alt="Canva" />
              <span className="text-lg">Canva</span>
            </div>
            <div className="flex items-center gap-2 group">
              <img src="/assets/adobe.png" className="w-6 h-6" alt="Adobe" />
              <span className="text-lg">Adobe</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
