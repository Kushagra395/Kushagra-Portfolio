import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useGSAP(() => {
    gsap.fromTo("#about-img", 
      { opacity: 0, x: -100 },
      {
        scrollTrigger: {
          trigger: "#about", // use the whole section as trigger instead of the hidden element
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out"
      }
    );
    
    gsap.fromTo("#about-text", 
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2
      }
    );
  }, []);

  return (
    <section id="about" className="relative z-10 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10 px-4">
        
        {/* Profile Image */}
        <div
          className="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-lg transition duration-500 flex flex-col items-center -mt-14"
          id="about-img"
        >
          <img
            src="/assets/KushagraMalviyaPortfolio.png"
            alt="Kushagra Malviya"
            className="w-full h-64 object-cover rounded-xl"
          />

          {/* Social Icons Below Image */}
          <div className="flex space-x-4 mt-4 justify-center">
            <a href=" " target="_blank" rel="noreferrer">
              <img src="/assets/instagram-logo.png" className="w-8 h-8" alt="instagram-logo" />
            </a>
            <a href="https://www.linkedin.com/in/kushagra-malviya-219076299/" target="_blank" rel="noreferrer">
              <img src="/assets/linkedin-logo.png" className="w-8 h-8" alt="linkedin-logo" />
            </a>
            <a href="mailto:kushagramalviya3@gmail.com">
              <img src="/assets/Gmail-logo.png" className="w-8 h-8" alt="mail-logo" />
            </a>
            <a href="https://github.com/Kushagra395" target="_blank" rel="noreferrer">
              <img src="/assets/Github-logo.png" className="w-7 h-7" alt="github-logo" />
            </a>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-2xl" id="about-text">
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug mb-4">
            I’m <span className="text-[#1DCD9F] font-bold">Kushagra Malviya</span>, a Full Stack Developer and UI/UX enthusiast crafting creative web experiences.
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Currently pursuing B.Tech at <span className="text-[#1DCD9F] font-semibold">IIIT Ranchi</span>, I build responsive and scalable applications using
            <span className="text-[#1DCD9F] font-bold"> React</span>,
            <span className="text-[#1DCD9F] font-bold"> Node.js</span>,
            <span className="text-[#1DCD9F] font-bold"> MongoDB</span>
            and <span className="text-[#1DCD9F] font-bold"> Firebase</span>.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            With hands-on UI/UX experience from my internship at <span className="text-[#1DCD9F] font-bold">Precollege</span>, and roles in <span className="text-[#1DCD9F] font-bold">GDG Ranchi</span> and <span className="text-[#1DCD9F] font-bold">Arcanum</span>,
            I love designing clean interfaces using <strong>Figma</strong> and <strong>Adobe</strong>.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Outside coding, I Love to explore new places, technologies and design.
          </p>

          {/* Download Resume Button */}
          <div className="flex items-center justify-center m-8">
            <a href="/assets/Kushagra_Malviya_Resume.pdf" download>
              <button className="dbutton" type="button">
                <span className="dbutton__text">Resume</span>
                <span className="dbutton__icon">
                  <img src="/assets/downloadbutton.svg" alt="download-icon" className="w-4 h-4 m-2" />
                </span>
              </button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
