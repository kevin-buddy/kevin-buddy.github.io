'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useFormState } from "react-dom";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ExternalLink, Menu, X, Download, Lock } from 'lucide-react';
import { sendEmailServer } from "../app/nodemailer";

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
                {/* <Link href="#" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    KS
                </Link> */}
                <Link href="#" className="pointer flex items-center">
                    <Image alt='Logo Frescura' src="/KS-Logo.png" width="48" height="48"/>
                    {/* <picture>
                        <img alt='Logo Frescura' src="/KS-Logo.jpg" className="mr-3" />
                    </picture> */}
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
            <Image alt='Profile Picture' src="/KS-Logo.jpg" width={128} height={128} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-400/50"/>
            {/* <img src="https://placehold.co/128x128/667eea/ffffff?text=JD" alt="Profile Picture" className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-indigo-400/50" /> */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Hi, I'm Kevin Setiabudi</h1>
            <p className="text-lg md:text-2xl text-indigo-200 mb-8 max-w-3xl mx-auto">A passionate Full Stack Developer creating modern and responsive web applications and more.</p>
            <a href="#projects" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform transform hover:scale-105 inline-block">
                View My Work
            </a>
        </div>
    </section>
);

// Project Card Component
const ProjectCard = ({ imgSrc, title, description, tags, demoUrl, repoUrl }: ProjectCardProps) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl flex flex-col">
        <Image src={imgSrc} alt={`${title} screenshot`} height={56} width={1366} className="w-full h-56 object-cover"/>
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
const ProjectsSection = () => {
    const projects = [
        // {
        //     imgSrc: "https://placehold.co/600x400/1a1a2e/ffffff?text=Project+One",
        //     title: "E-commerce Platform",
        //     description: "A full-featured e-commerce website with product listings, shopping cart, and checkout functionality.",
        //     tags: ["React", "Next.js", "Node.js", "MongoDB"],
        //     demoUrl: "#",
        //     repoUrl: "#",
        // },
        {
            imgSrc: "/SAP-ABAP.png",
            title: "SAP ABAP",
            description: "A SAP ABAP program with custom table, custom function module.",
            tags: ["SAP", "ABAP"],
            demoUrl: "",
            repoUrl: "",
        },
        {
            imgSrc: "/Frescura.png",
            title: "Frescura Landing Page",
            description: "A landing page for Frescura a healthy food brand that helps people to read history about the brand, see product catalog and even contact us using nodemailer.",
            tags: ["Next.js", "Nodemailer", "Tailwind CSS"],
            demoUrl: "https://frescura.vercel.app/",
            repoUrl: "https://github.com/kevin-buddy/frescura",
        },
        {
            imgSrc: "/binance-bot.png",
            title: "Trading Robot Using Binance API",
            description: "A trading robot in Binance mimicking grid trading strategy where the bot will contrinously make long and short order untill TP profit is bigger than fee and loses.",
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
                    <Image src="/KS-Logo.jpg" alt="About Me Image" height={512} width={512} className="rounded-full shadow-lg mx-auto w-64 h-64 md:w-80 md:h-80 object-cover"/>
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">About Me</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        A passionate software developer graduated with a Computer Science degree. I have experience with a variety of technologies including Python, Next.js, Node.js, and Vue.js. I'm also an experienced SAP that have trained users and also ABAP developer that have made and enhance ABAP program dan function modules.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        I believe in the power of technology to solve problems and create amazing experiences. Let's help you solve your problem together, feel free to contact me right away.
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
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useFormState(sendEmailServer,{message: 'init'});
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        if (state.message === 'success' && formRef.current) {
        formRef.current.reset();
        setShowPopup(true);
        } else if (state.message !== 'init') {
        console.log(state.message);
        alert(state.message);
        }
        setLoading(false);
    }, [state])
    const handleSubmit = () => {
        setLoading(true);
    };
    const closePopup = () => {
        setShowPopup(false);
    }
    useEffect(() => {
        if (state.message === 'success' && formRef.current) {
        formRef.current.reset();
        setShowPopup(true);
        } else if (state.message !== 'init') {
        console.log(state.message);
        alert(state.message);
        }
        setLoading(false);
    }, [state])
    return (
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">Get In Touch</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">I'm currently available for freelance work and open to new opportunities. Feel free to send me a message!</p>
                <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <form action={formAction} onSubmit={handleSubmit} ref={formRef}>
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
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        ></circle>
                                        <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    ) : (
                                    'Send Message'
                                    )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && (
            <div onClick={closePopup} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full relative animate-fade-in">
                {/* Close Button */}
                <button
                  onClick={() => {setShowPopup(false)}}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
                  aria-label="Close popup"
                >
                  ×
                </button>

                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-700 text-sm">
                  {`You've succesfully contact me`}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  Stay tuned for further contact I will contact you <strong>ASAP</strong>
                </p>
                {/* <p className="text-gray-700 text-sm mt-2">
                  You're now eligible to receive <strong>free clean food samples</strong> before anyone else.
                </p> */}
              </div>
            </div>
          )}
        </section>
    );
};

const Footer = () => (
    <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="https://github.com/kevin-buddy" className="text-2xl hover:text-indigo-400 transition-colors"><Github /></a>
                <a href="#" className="text-2xl hover:text-indigo-400 transition-colors"><Linkedin /></a>
                <a href="#" className="text-2xl hover:text-indigo-400 transition-colors"><Twitter /></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Kevin Setiabudi. All rights reserved.</p>
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