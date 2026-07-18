'use client';
import { useState, useEffect } from 'react';
import { Mail, ExternalLink, Menu, X, ArrowRight, Code, Briefcase, User, Send, Lock } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  demo_url?: string;
  github_url?: string;
  image?: string;
  isProprietary?: boolean;
}

const PORTFOLIO_DATA = {
  name: "Kevin Setiabudi",
  role: "Full-Stack Engineer",
  tagline: "Crafting elegant, high-performance digital experiences.",
  about: "I am a passionate developer who has interest in technology and business. With a focus on creating fun and usefull applications. When I'm not writing code, I'm exploring new technologies such as hosting my own local home server, or learning more about business and finance.",
  socials: {
    github: "https://github.com/kevin-buddy",
    linkedin: "https://linkedin.com",
    email: "kevin.setiabudi@protonmail.com"
  }
};

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
          <img 
                  src='K-Logo.jpg'
                  alt='logo' 
                  className="w-8 h-8 object-cover transition-transform duration-500 group-hover:scale-105"
                />
          {/* {PORTFOLIO_DATA.name.split(' ')[0]}<span className="text-gray-400">.</span> */}
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

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
    return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Briefcase className="text-gray-400" size={28} />
          Selected Work
        </h2>
        <p className="text-gray-500 max-w-xl">A collection of recent projects demonstrating my expertise in building scalable and user-centric applications.</p>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No projects available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col overflow-hidden border border-gray-200 rounded-2xl hover:border-gray-900 transition-colors bg-white">
              
              {/* Conditional Image Rendering */}
              {project.image && (
              <div className="w-full h-48 border-b border-gray-100 overflow-hidden bg-gray-50">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <Code size={24} />
                  </div>
                  {project.isProprietary ? (
                     <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                        <Lock size={14} />
                        <span className="text-xs font-medium uppercase tracking-wider">Proprietary</span>
                     </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {project.github_url && (
                        <a href={project.github_url} className="text-gray-400 hover:text-gray-900 transition-colors" target="_blank" rel="noreferrer" title="View Source">
                          <FaGithub size={20} />
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} className="text-gray-400 hover:text-gray-900 transition-colors" target="_blank" rel="noreferrer" title="Live Demo">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
                  {project.tags?.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

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
            <h4 className="font-bold text-gray-900 mb-2">Business</h4>
            <p className="text-gray-500 text-sm">SAP, ABAP</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Engineering</h4>
            <p className="text-gray-500 text-sm">React, Next.js, Node, TypeScript, Python</p>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full flex justify-center md:justify-end">
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute inset-0 bg-gray-200 rounded-2xl transform rotate-3 transition-transform hover:rotate-6 duration-300"></div>
          <div className="absolute inset-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <img 
              src="https://xbgczuawxzxevrzunbkx.supabase.co/storage/v1/object/public/personal_project_portfolio/K-Logo.jpg" 
              alt="Alex Developer" 
              className="w-full h-full object-cover"
            />
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
          <FaGithub size={20} />
        </a>
        <a href={PORTFOLIO_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
          <span className="sr-only">LinkedIn</span>
          <FaLinkedin size={20} />
        </a>
        <a href={`mailto:${PORTFOLIO_DATA.socials.email}`} className="text-gray-400 hover:text-gray-900 transition-colors">
          <span className="sr-only">Email</span>
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
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
        <ProjectsSection projects={projects} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}