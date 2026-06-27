'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ArrowRight, Code, Briefcase, User, Send, Lock } from 'lucide-react';

// --- DATA (Easily swap this out with your actual details) ---
const PORTFOLIO_DATA = {
  name: "Kevin Setiabudi",
  role: "Full-Stack Engineer & Designer",
  tagline: "Crafting elegant, high-performance digital experiences.",
  about: "I am a passionate developer who bridges the gap between engineering and design. With a focus on creating intuitive and scalable applications, I thrive on turning complex problems into simple, beautiful solutions. When I'm not writing code, I'm exploring new technologies, contributing to open source, or refining my design sensibilities.",
  projects: [
    {
      id: 1,
      title: "SAP ABAP",
      description: "Experienced with various ABAP projects such as creating ABAP program (SE38) and ABAP function module (SE37) and ABAP Smart Forms.",
      tech: ["SAP", "ABAP"],
      link: "#",
      image: true,
      isProprietary: true
    },
    {
      id: 2,
      title: "Frescura Landing Page",
      description: "A landing page for Frescura a healthy food brand that helped showcasing brand's image, history, see product catalog and even contact us using nodemailer.",
      tech: ["Next.js", "Nodemailer", "Tailwind CSS"],
      link: "https://frescura.vercel.app/",
      image: true,
      isProprietary: false
    },
    {
      id: 3,
      title: "Trading Robot Using Binance API",
      description: "A trading robot in Binance using a strategy where the bot will continuously make long and short order using a certain formula to prevent martingale problem untill it hits TP.",
      tech: ["Python"],
      link: "#",
      image: true,
      isProprietary: true
    },
    {
      id: 4,
      title: "Cute Date Asking Website",
      description: "A cute website for asking dates, that also reports the form submitted throught telegram.",
      tech: ["Next.js", "Tailwind CSS", "Telegram API"],
      link: "https://buttonofdestiny.vercel.app/",
      image: true,
      isProprietary: false
    },
    {
      id: 5,
      title: "Aggregator Brand Link Website",
      description: "A website that collects indonesia local brand links to their website, in recent trend where brand start to have their own website.",
      tech: ["Next.js", "Tailwind CSS"],
      link: "https://inaggre.vercel.app/",
      image: true,
      isProprietary: false
    },
  ],
  socials: {
    github: "https://github.com/kevin-buddy",
    linkedin: "https://linkedin.com",
    email: "kevin.setiabudi@protonmail.com"
  }
};

// --- COMPONENTS ---

const Header = ({ activeSection }: { activeSection: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold tracking-tighter text-gray-900">
          {PORTFOLIO_DATA.name.split(' ')[0]}<span className="text-gray-400">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gray-900 ${activeSection === link.href.substring(1) ? 'text-gray-900' : 'text-gray-500'}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900 font-medium py-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section id="home" className="min-h-screen flex items-center pt-20 pb-12 px-6 md:px-12 max-w-6xl mx-auto">
    <div className="max-w-3xl">
      <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
        <span className="w-8 h-[2px] bg-gray-300 inline-block"></span>
        Hello, I am {PORTFOLIO_DATA.name}
      </p>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
        {PORTFOLIO_DATA.role}.
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
        {PORTFOLIO_DATA.tagline}
      </p>
      <div className="flex flex-wrap gap-4">
        <a 
          href="#projects" 
          className="bg-gray-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          View Projects <ArrowRight size={18} />
        </a>
        <a 
          href="#contact" 
          className="bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-full font-medium hover:border-gray-900 hover:bg-gray-50 transition-all"
        >
          Contact Me
        </a>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <Briefcase className="text-gray-400" size={28} />
        Selected Work
      </h2>
      <p className="text-gray-500 max-w-xl">A collection of recent projects demonstrating my expertise in building scalable and user-centric applications.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PORTFOLIO_DATA.projects.map((project) => (
        <div key={project.id} className="group flex flex-col overflow-hidden border border-gray-200 rounded-2xl hover:border-gray-900 transition-colors bg-white">
          
          {/* Conditional Image Rendering */}
          {project.image && (
            <div className="w-full h-48 bg-gray-100 border-b border-gray-200 relative overflow-hidden">
                {/* Replace this div with an actual <img src={project.image} /> in your real app */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                    [ Project Image Placeholder ]
                </div>
            </div>
          )}

          <div className="p-8 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-900 group-hover:text-white transition-colors">
                <Code size={24} />
              </div>
              
              {/* Conditional Link or Proprietary Lock Rendering */}
              {project.isProprietary ? (
                 <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                    <Lock size={14} />
                    <span className="text-xs font-medium uppercase tracking-wider">Proprietary</span>
                 </div>
              ) : (
                <a href={project.link || '#'} className="text-gray-400 hover:text-gray-900 transition-colors">
                  <ExternalLink size={20} />
                </a>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-24 px-6 md:px-12 bg-gray-50">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <User className="text-gray-400" size={28} />
          About Me
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {PORTFOLIO_DATA.about}
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Design</h4>
            <p className="text-gray-500 text-sm">UI/UX, Wireframing, Prototyping, Figma</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Engineering</h4>
            <p className="text-gray-500 text-sm">React, Next.js, Node, TypeScript, Tailwind</p>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full flex justify-center md:justify-end">
        {/* Placeholder for a classy abstract image or headshot */}
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute inset-0 bg-gray-200 rounded-2xl transform rotate-3 transition-transform hover:rotate-6 duration-300"></div>
          <div className="absolute inset-0 bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-8 text-center shadow-sm">
            <span className="text-gray-400 font-medium">[ Your Image / Abstract Art Here ]</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Let's build something together.</h2>
    <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
      I'm currently available for freelance work and open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
    </p>
    <a 
      href={`mailto:${PORTFOLIO_DATA.socials.email}`}
      className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors text-lg"
    >
      <Send size={20} />
      Say Hello
    </a>
  </section>
);

const Footer = () => (
  <footer className="border-t border-gray-100 py-10 px-6 md:px-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.
      </div>
      <div className="flex items-center gap-6">
        <a href={PORTFOLIO_DATA.socials.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
          <span className="sr-only">GitHub</span>
          <Github size={20} />
        </a>
        <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
          <span className="sr-only">LinkedIn</span>
          <Linkedin size={20} />
        </a>
        <a href={`mailto:${PORTFOLIO_DATA.socials.email}`} className="text-gray-400 hover:text-gray-900 transition-colors">
          <span className="sr-only">Email</span>
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scrolling implementation (simulating browser native behavior elegantly)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer to update active nav link
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      <Header activeSection={activeSection} />
      
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}