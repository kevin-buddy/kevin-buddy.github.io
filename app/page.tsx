'use client'
import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ExternalLink, Menu, X, Download, Lock } from 'lucide-react';

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] });

// --- Reusable Components ---
interface ProjectCardProps {
    imgSrc: string;
    title: string;
    description: string;
    tags: string[];
    demoUrl: string;
    repoUrl: string;
}

// Project Card Component
const ProjectCard = ({ imgSrc, title, description, tags, demoUrl, repoUrl }: ProjectCardProps) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl flex flex-col">
        <img src={imgSrc} alt={`${title} screenshot`} className="w-full h-56 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 h-24 flex-grow">{description}</p>
            <div className="mb-4 flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span key={tag} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center mt-auto pt-4">
                {demoUrl ? (
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
                        Live Demo <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                ) : (
                    <span className="text-gray-400 dark:text-gray-500 flex items-center text-sm">
                        <Lock className="w-4 h-4 mr-1" /> Proprietary
                    </span>
                )}
                {repoUrl && (
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-white">
                        <Github className="w-6 h-6" />
                    </a>
                )}
            </div>
        </div>
    </div>
);

// --- Page Sections ---

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        { href: "#projects", label: "Projects" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="#" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    JD
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                         <Link key={link.href} href={link.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>
                <a href="#contact" className="hidden md:inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">
                    Contact Me
                </a>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none text-gray-800 dark:text-gray-200">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
            {/* Mobile Menu */}
            {isMenuOpen && (
                 <div className="md:hidden px-6 pb-4 bg-white/80 dark:bg-gray-900/80">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="block py-2 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => setIsMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <a href="#contact" className="block mt-2 bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg text-center hover:bg-indigo-700" onClick={() => setIsMenuOpen(false)}>
                        Contact Me
                    </a>
                </div>
            )}
        </header>
    );
};

const HeroSection = () => (
    <section id="home" className="text-white py-20 md:py-32 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
        <div className="container mx-auto px-6 text-center">
            <img src="https://placehold.co/128x128/667eea/ffffff?text=JD" alt="Profile Picture" className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-400/50" />
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Hi, I'm Kevin Setiabudi</h1>
            <p className="text-lg md:text-2xl text-indigo-200 mb-8 max-w-3xl mx-auto">A passionate Full Stack Developer creating modern and responsive web applications.</p>
            <a href="#projects" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform transform hover:scale-105 inline-block">
                View My Work
            </a>
        </div>
    </section>
);

const ProjectsSection = () => {
    const projects = [
        {
            imgSrc: "https://placehold.co/600x400/1a1a2e/ffffff?text=Project+One",
            title: "E-commerce Platform",
            description: "A full-featured e-commerce website with product listings, shopping cart, and checkout functionality.",
            tags: ["React", "Next.js", "Node.js", "MongoDB"],
            demoUrl: "#",
            repoUrl: "#",
        },
        {
            imgSrc: "https://placehold.co/600x400/16213e/ffffff?text=Project+Two",
            title: "Frescura Landing Page",
            description: "A collaborative task management tool to help teams stay organized and productive with real-time updates.",
            tags: ["Next.js", "Nodemailer", "Tailwind CSS"],
            demoUrl: "https://frescura.vercel.app/",
            repoUrl: "https://github.com/kevin-buddy/frescura",
        },
        {
            imgSrc: "https://placehold.co/600x400/0f3460/ffffff?text=Project+Three",
            title: "Trading Robot Using Binance API",
            description: "An interactive dashboard for visualizing complex datasets with various chart types and filters.",
            tags: ["Python"],
            demoUrl: "",
            repoUrl: "",
        },
    ];

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map(project => <ProjectCard key={project.title} {...project} />)}
                </div>
            </div>
        </section>
    );
};

const AboutSection = () => (
    <section id="about" className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                <div className="md:w-1/3 flex-shrink-0">
                    <img src="https://placehold.co/400x400/e0e7ff/312e81?text=About+Me" alt="About Me Image" className="rounded-full shadow-lg mx-auto w-64 h-64 md:w-80 md:h-80 object-cover"></img>
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">About Me</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        I'm a self-taught web developer with a passion for building beautiful and functional websites. I have experience with a variety of technologies including React, Node.js, and Vue.js. I'm always eager to learn new things and take on challenging projects.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        When I'm not coding, I enjoy hiking, photography, and exploring new coffee shops. I believe in the power of technology to solve problems and create amazing experiences.
                    </p>
                    <a href="/path-to-your-resume.pdf" download className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 inline-flex items-center">
                        <Download className="w-5 h-5 mr-2" />
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    </section>
);

const ContactSection = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus('Sending...');
        
        // This is a mock submission. 
        // In a real Next.js app, you'd send this to an API route.
        // e.g., await fetch('/api/contact', { ... });
        setTimeout(() => {
            setStatus('Thank you for your message!');
            e.target.reset();
            setTimeout(() => setStatus(''), 5000);
        }, 1000);
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">Get In Touch</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">I'm currently available for freelance work and open to new opportunities. Feel free to send me a message!</p>
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Name</label>
                            <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Message</label>
                            <textarea id="message" name="message" className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" required></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 w-full sm:w-auto">
                                Send Message
                            </button>
                        </div>
                    </form>
                    {status && <div className="text-center mt-4 text-green-500">{status}</div>}
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" className="text-2xl hover:text-indigo-400 transition-colors"><Github /></a>
                <a href="#" className="text-2xl hover:text-indigo-400 transition-colors"><Linkedin /></a>
                <a href="#" className="text-2xl hover:text-indigo-400 transition-colors"><Twitter /></a>
            </div>
            <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
    </footer>
);


// --- Main App Component ---
// This would be your main page file, e.g., `pages/index.js` in Next.js
export default function PortfolioPage() {
  return (
    // The className from `inter.className` applies the font to the whole page
    <div className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${inter.className}`}>
      <Head>
        <title>Kevin Setiabudi - Full Stack Developer Portfolio</title>
        <meta name="description" content="Portfolio of Kevin Setiabudi, a passionate full stack developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
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