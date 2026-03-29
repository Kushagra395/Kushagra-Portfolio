import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function UpcomingProjects() {
  useGSAP(() => {
    gsap.utils.toArray(".upcoming-card").forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 60 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    });
  }, []);

  return (
    <section id="upcoming-projects" className="relative z-10 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Upcoming Projects</h2>
        <p className="text-gray-400 text-lg">Some exciting ideas I'm currently working on.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* CARD: MediSwift */}
        <div className="upcoming-card bg-white text-black rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">MediGoo</h3>
          <p className="text-gray-700 text-lg mb-4">
            A 10-minute emergency medicine delivery platform inspired by Zepto and Swiggy. Designed for instant access to essential medicines during medical emergencies.
          </p>
          <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-semibold">Coming Soon</span>
        </div>

        {/* CARD: TripNest */}
        <div className="upcoming-card bg-white text-black rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">TripNest</h3>
          <p className="text-gray-700 text-lg mb-4">
            An all-in-one holiday booking app offering flights, stays, transport, activities, and itinerary planning—your complete travel companion in one place.
          </p>
          <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-semibold">Coming Soon</span>
        </div>

        {/* CARD: AirTrackr */}
        <div className="upcoming-card bg-white text-black rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">AirTrackr</h3>
          <p className="text-gray-700 text-lg mb-4">
            A real-time flight and passenger tracking platform using PNR. Helps families track check-in, boarding, luggage, and live flight status—just like “Where is my Train” for air travel.
          </p>
          <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-semibold">Coming Soon</span>
        </div>
      </div>
    </section>
  );
}
