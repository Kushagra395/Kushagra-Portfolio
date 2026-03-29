import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  useGSAP(() => {
    gsap.utils.toArray(".education-card").forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 80 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        }
      );
    });
  }, []);

  return (
    <section id="education" className="relative z-10 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center text-[#1DCD9F]">My Education</h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#1DCD9F]"></div>

          {/* Timeline Card 1 - Right */}
          <div className="relative mb-16 md:mb-24 md:flex justify-end">
            <div className="hidden md:block absolute w-4 h-4 bg-[#1DCD9F] rounded-full left-1/2 transform -translate-x-1/2 top-4 z-10"></div>
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-[#111] p-6 rounded-2xl border border-[#1DCD9F] shadow-lg education-card">
                <div className="flex items-center gap-4 mb-2">
                  <img src="/assets/IIITR.png" alt="IIIT Ranchi Logo" className="w-12 h-12 object-contain rounded" />
                  <h3 className="text-xl font-semibold text-[#1DCD9F]">B.Tech – IIIT Ranchi</h3>
                </div>
                <span className="text-sm text-gray-400">Aug 2023 – May 2027</span>
                <p className="mt-2 text-gray-300">Pursuing Electronics and Communication Engineering with a CGPA of 8.03. Active in technical societies and hands-on projects in cloud, UI/UX, and full-stack development.</p>
              </div>
            </div>
          </div>

          {/* Timeline Card 2 - Left */}
          <div className="relative mb-16 md:mb-24 md:flex justify-start">
            <div className="hidden md:block absolute w-4 h-4 bg-[#1DCD9F] rounded-full left-1/2 transform -translate-x-1/2 top-4 z-10"></div>
            <div className="md:w-1/2 md:pr-10">
              <div className="bg-[#111] p-6 rounded-2xl border border-[#1DCD9F] shadow-lg education-card">
                <div className="flex items-center gap-4 mb-2">
                  <img src="/assets/matoshri.png" alt="Matoshri Logo" className="w-10 h-10 object-contain rounded" />
                  <h3 className="text-xl font-semibold text-[#1DCD9F]">Class XII – Matoshri College of Education</h3>
                </div>
                <span className="text-sm text-gray-400">Apr 2021 – May 2023</span>
                <p className="mt-2 text-gray-300">Completed Higher Secondary with 80.8%. Focused on science stream with strong foundations in mathematics and computer fundamentals.</p>
              </div>
            </div>
            <div className="md:w-1/2"></div>
          </div>

          {/* Timeline Card 3 - Right */}
          <div className="relative mb-16 md:mb-24 md:flex justify-end">
            <div className="hidden md:block absolute w-4 h-4 bg-[#1DCD9F] rounded-full left-1/2 transform -translate-x-1/2 top-4 z-10"></div>
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-[#111] p-6 rounded-2xl border border-[#1DCD9F] shadow-lg education-card">
                <div className="flex items-center gap-4 mb-2">
                  <img src="/assets/NCS.png" alt="Nashik Cambridge School Logo" className="w-10 h-10 object-contain rounded" />
                  <h3 className="text-xl font-semibold text-[#1DCD9F]">Class X – Nashik Cambridge School</h3>
                </div>
                <span className="text-sm text-gray-400">Jun 2020 – May 2021</span>
                <p className="mt-2 text-gray-300">Secured 93% in CBSE board examinations. Strong academic performance with leadership in extracurriculars.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
