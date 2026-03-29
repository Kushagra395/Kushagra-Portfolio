import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  useGSAP(() => {
    gsap.utils.toArray(".journey-card").forEach((card) => {
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
    <section id="journey" className="relative z-10 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center text-[#1DCD9F]">My Journey</h2>
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#1DCD9F]"></div>

          {/* Timeline Card 0 - Right */}
          <div className="relative mb-16 md:mb-24 md:flex justify-end">
            <div className="hidden md:block absolute w-4 h-4 bg-[#1DCD9F] rounded-full left-1/2 transform -translate-x-1/2 top-4 z-10"></div>
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-[#111] p-6 rounded-2xl border border-[#1DCD9F] shadow-lg journey-card">
                <div className="flex items-center gap-4 mb-2">
                  <img src="/assets/glory.jpeg" alt="Glory Logo" className="w-8 h-8 object-contain" />
                  <h3 className="text-xl font-semibold text-[#1DCD9F]"> Frontend Intern @Glory Media</h3>
                </div>
                <span className="text-sm text-gray-400"> Jul 2025 - Jan 2025</span>
                <p className="mt-2 text-gray-300">Contributed to the in house and client projects The RightTool, where I worked on the entire frontend and responsive UI part using Next.js and modern UI frameworks, the second is SuppAI, which is client based project where I created an interactive dashboard using React.js. using React and Tailwind CSS.</p>
              </div>
            </div>
          </div>
          
          {/* Timeline Card 1 - Left */}
          <div className="relative mb-16 md:mb-24 md:flex justify-start">
            <div className="hidden md:block absolute w-4 h-4 bg-[#1DCD9F] rounded-full left-1/2 transform -translate-x-1/2 top-4 z-10"></div>
            <div className="md:w-1/2 md:pr-10">
              <div className="bg-[#111] p-6 rounded-2xl border border-[#1DCD9F] shadow-lg journey-card">
                <div className="flex items-center gap-2 mb-2">
                  <img src="/assets/Gdg.png" alt="GDG Logo" className="w-9 h-9 object-contain" />
                  <h3 className="text-xl font-semibold text-[#1DCD9F]">Visual Designer @GDG Ranchi</h3>
                </div>
                <span className="text-sm text-gray-400">Jun 2025 – Dec 2025</span>
                <p className="mt-2 text-gray-300">Contributed as a core design team member. Led visual branding for DevFest Ranchi and other GDG events, boosting engagement through professional graphics and creative direction.</p>
              </div>
            </div>
            <div className="md:w-1/2"></div>
          </div>

          {/* Timeline Card 2 - Right */}
          <div className="relative mb-16 md:mb-24 md:flex justify-end">
            <div className="hidden md:block absolute w-4 h-4 bg-[#1DCD9F] rounded-full left-1/2 transform -translate-x-1/2 top-4 z-10"></div>
            <div className="md:w-1/2"></div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-[#111] p-6 rounded-2xl border border-[#1DCD9F] shadow-lg journey-card">
                <div className="flex items-center gap-4 mb-2">
                  <img src="/assets/arcanum.svg" alt="Arcanum Logo" className="w-8 h-8 object-contain" />
                  <h3 className="text-xl font-semibold text-[#1DCD9F]">Lead @Arcanum (Dev & UI/UX Wing)</h3>
                </div>
                <span className="text-sm text-gray-400">IIIT Ranchi • Aug 2024 - Present</span>
                <p className="mt-2 text-gray-300">Led game dev and design events (50+ participants), managed social media, and organized intra-college competitions. Drove UI/UX initiatives and branding across campus events.</p>
              </div>
            </div>
          </div>

          {/* Timeline Card 3 - Left */}
          <div className="relative mb-16 md:mb-24 md:flex justify-start">
            <div className="hidden md:block absolute w-4 h-4 bg-[#1DCD9F] rounded-full left-1/2 transform -translate-x-1/2 top-4 z-10"></div>
            <div className="md:w-1/2 md:pr-10">
              <div className="bg-[#111] p-6 rounded-2xl border border-[#1DCD9F] shadow-lg journey-card">
                <div className="flex items-center gap-2 mb-2">
                  <img src="/assets/precollege.png" alt="Precollege Logo" className="w-8 h-8 object-contain" />
                  <h3 className="text-xl font-semibold text-[#1DCD9F]">UI/UX Intern @Precollege</h3>
                </div>
                <span className="text-sm text-gray-400">May 2024 – Jul 2024</span>
                <p className="mt-2 text-gray-300">Designed intuitive and user-friendly layouts for an educational platform. Translated wireframes into responsive UI components, enhancing navigation flow and interface consistency.</p>
              </div>
            </div>
            <div className="md:w-1/2"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
