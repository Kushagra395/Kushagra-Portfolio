import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        'service_52ejxr9',
        'template_ayzg3kq',
        form.current,
        'O6QaqXTN6XfGV3uqJ'
      )
      .then(
        (result) => {
          setSubmitStatus('success');
          setIsSubmitting(false);
          e.target.reset();
        },
        (error) => {
          setSubmitStatus('error');
          setIsSubmitting(false);
        }
      );
  };

  return (
    <section id="contact" className="relative z-10 min-h-screen bg-black text-white py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#00C896] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#00C896] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left Section - Typography & Details */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="inline-block mb-4">
            <span className="text-[#00C896] font-bold tracking-widest uppercase text-sm border border-[#00C896] px-4 py-1 rounded-full">
              Contact Me
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
            Let's build <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #00C896', color: '#00C896', textShadow: '0 0 20px rgba(0,200,150,0.4)' }}>
              something
            </span> <br />
            amazing
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
            Have an idea in mind or just want to chat? Fill out the form or reach out directly via my socials. My inbox is always open.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-[#00C896] flex-shrink-0 transition-transform hover:scale-110 hover:border-[#00C896] hover:shadow-[0_0_15px_rgba(0,200,150,0.3)]">
                <i className="fas fa-envelope text-lg"></i>
              </div>
              <div>
                <h4 className="text-gray-300 text-sm uppercase tracking-wider font-bold mb-1">Email</h4>
                <a href="mailto:kushagramalviya3@gmail.com" className="text-xl text-white hover:text-[#00C896] transition-colors relative group inline-block">
                  kushagramalviya3@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00C896] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a href="https://github.com/Kushagra395" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-white hover:text-[#00C896] hover:border-[#00C896] hover:shadow-[0_0_15px_rgba(0,200,150,0.3)] transition-all duration-300 transform hover:-translate-y-2">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://linkedin.com/in/kushagramalviya" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-white hover:text-[#00C896] hover:border-[#00C896] hover:shadow-[0_0_15px_rgba(0,200,150,0.3)] transition-all duration-300 transform hover:-translate-y-2">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="https://twitter.com/kushagramalviya" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-white hover:text-[#00C896] hover:border-[#00C896] hover:shadow-[0_0_15px_rgba(0,200,150,0.3)] transition-all duration-300 transform hover:-translate-y-2">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://iiitranchi.ac.in/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-white hover:text-[#00C896] hover:border-[#00C896] hover:shadow-[0_0_15px_rgba(0,200,150,0.3)] transition-all duration-300 transform hover:-translate-y-2" title="IIIT Ranchi">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Premium Form */}
        <div className="lg:w-1/2 flex items-center">
          <div className="w-full bg-[#050505] p-8 md:p-12 rounded-[2rem] border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Subtle inner glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00C896] to-transparent opacity-50"></div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 tracking-wide">Ready to get started?</h3>
              <p className="text-gray-500 text-sm">Drop me a message and I'll get back to you within 24 hours.</p>
            </div>
            
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="name" className="text-[10px] text-[#00C896] uppercase tracking-widest font-bold ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-5 py-4 text-white text-base focus:outline-none focus:border-[#00C896] focus:shadow-[0_0_10px_rgba(0,200,150,0.1)] transition-all placeholder:text-white/20 disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="email" className="text-[10px] text-[#00C896] uppercase tracking-widest font-bold ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-5 py-4 text-white text-base focus:outline-none focus:border-[#00C896] focus:shadow-[0_0_10px_rgba(0,200,150,0.1)] transition-all placeholder:text-white/20 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] text-[#00C896] uppercase tracking-widest font-bold ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell me about your project..."
                  disabled={isSubmitting}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-5 py-4 text-white text-base leading-relaxed focus:outline-none focus:border-[#00C896] focus:shadow-[0_0_10px_rgba(0,200,150,0.1)] transition-all resize-none placeholder:text-white/20 disabled:opacity-50"
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#00C896] hover:bg-[#00ad82] text-black font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(0,200,150,0.3)] hover:shadow-[0_0_30px_rgba(0,200,150,0.5)] transform hover:-translate-y-1 flex justify-center items-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <i className="fas fa-paper-plane transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>}
                </button>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mt-2 text-center text-[#00C896] text-sm bg-[#00C896]/10 py-2 rounded-lg border border-[#00C896]/30">
                  Message sent successfully! I'll be in touch soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-2 text-center text-red-500 text-sm bg-red-500/10 py-2 rounded-lg border border-red-500/30">
                  Failed to send message. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      
      {/* Restoring fixed email side bar just in case it's part of the global portfolio layout container */}
      <a
        href="mailto:kushagramalviya3@gmail.com"
        className="fixed-email hidden lg:block"
        title="Mail Me"
      >
        kushagramalviya3@gmail.com
      </a>
    </section>
  );
}
