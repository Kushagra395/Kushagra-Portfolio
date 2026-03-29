import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  useGSAP(() => {
    gsap.utils.toArray(".project-card").forEach((card) => {
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
    <section id="projects" className="relative z-10 text-white py-20 px-6 overflow-hidden">
      {/* ACTUAL PROJECT CONTENT */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-300 text-lg">Some of the things I've built.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* SINGLE PROJECT CARD */}
          <div className="project-card bg-white text-black shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <img src="/assets/prehireBanner.png" alt="Portfolio Website Screenshot" className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Prehire</h3>
              <p className="text-gray-700 mb-4">
               PreHire is an AI-driven mock interview platform that simulates real-time Q&A using Google Gemini API. It features secure authentication with Clerk, stores performance data in Firebase, and offers a clean, responsive UI with Tailwind and ShadCN UI.
              </p>
              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-4 h-4" />
                  React
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-4 h-4" />
                  Tailwind CSS
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-4 h-4" />
                  Gemini
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="w-4 h-4" />
                 Firebase
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="/assets/Clerk.png" alt="clerk" className="w-4 h-4" />
                  Clerk
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://prehire-ai-interviewer.vercel.app/" target="_blank" rel="noreferrer"
                  className="bg-[#1DCD9F] text-white px-4 py-2 rounded hover:bg-[#17b890] transition-all text-sm">
                  Live Demo 
                </a>
                <a href="https://github.com/Kushagra395/PreHire_AI_Interviewer" target="_blank" rel="noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all text-sm">
                  GitHub 
                </a>
              </div>
            </div>
          </div>

          {/* SINGLE PROJECT CARD */}
          <div className="project-card bg-white text-black shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <img src="/assets/vibely.png" alt="Vibely App Screenshot" className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Vibely</h3>
              <p className="text-gray-700 mb-4">
                A real-time full-stack chat application with instant messaging, image sharing, and user profile customization. Built with MERN stack, Socket.IO for live communication, and deployed on Render. Includes theme toggling and profile editing.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-4 h-4" alt="React" />
                  React
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-4 h-4" alt="MongoDB" />
                  MongoDB
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-4 h-4" alt="Node.js" />
                  Node.js
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" className="w-4 h-4 bg-white rounded p-0.5" alt="Express" />
                  Express
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" className="w-4 h-4" alt="Socket.IO" />
                  Socket.IO
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://vibely-fymd.onrender.com/login" target="_blank" rel="noreferrer"
                  className="bg-[#1DCD9F] text-white px-4 py-2 rounded hover:bg-[#17b890] transition-all text-sm">
                  Live Demo
                </a>
                <a href="https://github.com/Kushagra395/Vibly-The_Chatbox" target="_blank" rel="noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all text-sm">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* SINGLE PROJECT CARD */}
          <div className="project-card bg-white text-black shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <img src="/assets/Eatwise.png" alt="Eatwise Restaurant App Screenshot" className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Eatwise</h3>
              <p className="text-gray-700 mb-4">
                A responsive restaurant booking interface with table reservation, food menu, dark mode, and smooth cart flow. Includes user profile, real-time cart updates, and a secure payment experience with enhanced UX using Framer Motion.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" className="w-4 h-4" />
                  HTML
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" className="w-4 h-4" />
                  CSS
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-4 h-4" />
                  JavaScript
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-4 h-4" />
                  Tailwind CSS
                </span>
                 <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="/assets/framer.png" alt="framer" className="w-4 h-4 rounded" />
                  Framer Motion
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://avatars.githubusercontent.com/u/71514529?s=200&v=4" alt="DaisyUI" className="w-4 h-4 rounded" />
                  DaisyUI
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://eat-wise-restro-booking-assignment.vercel.app" target="_blank" rel="noreferrer"
                  className="bg-[#1DCD9F] text-white px-4 py-2 rounded hover:bg-[#17b890] transition-all text-sm">
                  Live Demo
                </a>
                <a href="https://github.com/Kushagra395/EatWise-Restro_Booking_Assignment" target="_blank" rel="noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all text-sm">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* SINGLE PROJECT CARD */}
          <div className="project-card bg-white text-black shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <img src="/assets/nua_ecommerce.png" alt="Nua Ecommerce Screenshot" className="w-full h-60 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Nua Ecommerce</h3>
              <p className="text-gray-700 mb-4">
                A modern, fully functioning e-commerce storefront built with React and Tailwind CSS. It features a sleek dark-themed UI, dynamic product routing across categories (Men, Women, Jewellery, Electronics), and an intuitive cart management system designed for seamless checkout flows.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-4 h-4" />
                  React
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-4 h-4" />
                  Tailwind CSS
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://ui.shadcn.com/favicon.ico" alt="Shadcn UI" className="w-4 h-4 rounded-sm" />
                  Shadcn UI
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <span className="font-bold text-[10px] leading-none px-1 py-0.5 bg-black text-white rounded-sm">v0</span>
                  v0
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 text-xs rounded cursor-pointer">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-4 h-4" />
                  TypeScript
                </span>
              </div>
              <div className="flex gap-4">
                <a href="https://nua-ecommerces.vercel.app/" target="_blank" rel="noreferrer"
                  className="bg-[#1DCD9F] text-white px-4 py-2 rounded hover:bg-[#17b890] transition-all text-sm">
                  Live Demo
                </a>
                <a href="https://github.com/Kushagra395/Nua-Ecommerce" target="_blank" rel="noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all text-sm">
                  GitHub
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
