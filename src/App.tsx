import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Code, 
  Cpu, 
  Database, 
  Layout, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Sparkles,
  Send,
  GraduationCap,
  Globe,
  Menu,
  X
} from 'lucide-react';
import AetherFlowHero from './components/ui/aether-flow-hero';
import { HeroScrollDemo } from './components/ui/demo';

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const heroRef = useRef<HTMLDivElement | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const skillCategories = [
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: Code,
      skills: [
        { name: 'C / C++', level: 90, desc: 'Core Algorithms, OOP, Systems Programming' },
        { name: 'JavaScript (ES6+)', level: 92, desc: 'Async execution, Prototypes, Modern Web APIs' },
        { name: 'Java', level: 82, desc: 'Object Oriented Architecture & Desktop Basics' },
        { name: 'x86 Assembly', level: 70, desc: 'Low-level Microcontroller Logic & Registers' }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Layout,
      skills: [
        { name: 'React.js', level: 92, desc: 'Hooks, Context, State Management, Reusable Component Architecture' },
        { name: 'Tailwind CSS', level: 95, desc: 'Utility-first layout, Modern Glassmorphism & Custom Themes' },
        { name: 'HTML5 & CSS3', level: 95, desc: 'Semantic Structure, Flexbox/Grid, Animations & Canvas APIs' },
        { name: 'Framer Motion', level: 88, desc: 'Interactive Micro-interactions & Physics Page Transitions' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend & Databases',
      icon: Database,
      skills: [
        { name: 'Node.js', level: 86, desc: 'RESTful API Services, Express Server Config & Middleware' },
        { name: 'Express.js', level: 88, desc: 'Route Controller Patterns & API Integration' },
        { name: 'MySQL Database', level: 84, desc: 'Relational Schema Design, Complex Queries & Joins' },
        { name: 'Prisma ORM', level: 85, desc: 'Type-safe Database Access & Data Migration Tools' }
      ]
    },
    {
      id: 'tools',
      title: 'Hardware & Dev Tools',
      icon: Cpu,
      skills: [
        { name: 'Arduino C++', level: 85, desc: 'Embedded Hardware Systems, Sensors & Actuators' },
        { name: 'Git & GitHub', level: 90, desc: 'Version Control, Collaborative Workflows & CI/CD Basics' },
        { name: 'VS Code & Tools', level: 95, desc: 'Extensive extensions, Debugging & Dev Environment Setup' },
        { name: 'REST APIs', level: 90, desc: 'Client-Server Specs, JSON Payloads & Endpoint Security' }
      ]
    }
  ];

  const projects = [
    {
      id: 'bookstore',
      title: 'Bookstore Management System',
      category: 'Full-Stack Web App',
      description: 'A complete full-stack web application designed for online bookstores featuring dynamic inventory management, database relational schemas powered by Prisma ORM and MySQL, and seamless authentication routes.',
      tech: ['React.js', 'Node.js', 'Express.js', 'Prisma ORM', 'MySQL', 'Tailwind CSS'],
      github: 'https://github.com/Fahim183',
      codePreview: `const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAvailableBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { inStock: true },
      include: { category: true }
    });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};`
    },
    {
      id: 'solar-tracker',
      title: 'Dual-Axis Sun Tracking Solar Panel',
      category: 'Hardware & IoT System',
      description: 'An embedded hardware solution built with Arduino C++ that uses a 4-LDR sensor array to continuously sense maximum light exposure and adjust dual servo motors dynamically.',
      tech: ['Arduino C++', 'LDR Sensors', 'Servo Motors', 'Circuit Design'],
      github: 'https://github.com/Fahim183',
      codePreview: `#include <Servo.h>
Servo horizontal; 
Servo vertical;
int servoh = 90, servov = 90;

void setup() {
  horizontal.attach(9);
  vertical.attach(10);
}

void loop() {
  int lt = analogRead(A0);
  int rt = analogRead(A1);
  int ld = analogRead(A2);
  int rd = analogRead(A3);
  int avt = (lt + rt) / 2;
  int avd = (ld + rd) / 2;
  if (abs(avt - avd) > 10) {
    if (avt > avd) servov = min(servov + 1, 180);
    else servov = max(servov - 1, 0);
    vertical.write(servov);
  }
  delay(20);
}`
    }
  ];

  const services = [
    {
      title: 'Full-Stack Web Development',
      icon: Layout,
      description: 'Custom, scalable web applications built from scratch using React, Node.js, Express, and MySQL/Prisma ORM.'
    },
    {
      title: 'Interactive Motion UI',
      icon: Sparkles,
      description: 'Elevating websites with dynamic physics animations, interactive canvas visualizers, and Framer Motion transitions.'
    },
    {
      title: 'Landing Pages & Responsive Design',
      icon: Globe,
      description: 'High-converting pixel-perfect landing pages optimized for all mobile, tablet, and desktop viewports.'
    },
    {
      title: 'Embedded Hardware & Systems',
      icon: Cpu,
      description: 'Designing microcontroller-based logic, sensor-actuator integration, and IoT prototypes leveraging C++.'
    }
  ];

  const navItems = [
    { id: 'hero', label: 'Home', ref: heroRef },
    { id: 'showcase', label: 'Showcase', ref: showcaseRef },
    { id: 'about', label: 'About', ref: aboutRef },
    { id: 'skills', label: 'Skills', ref: skillsRef },
    { id: 'projects', label: 'Projects', ref: projectsRef },
    { id: 'services', label: 'Services', ref: servicesRef },
    { id: 'contact', label: 'Contact', ref: contactRef },
  ];

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-300 selection:bg-purple-500 selection:text-white",
      theme === 'dark' ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
        <div className={cn(
          "max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-xl transition-all duration-300",
          theme === 'dark' 
            ? "bg-slate-900/70 border-slate-800 text-slate-100 shadow-purple-950/20" 
            : "bg-white/70 border-slate-200/80 text-slate-900 shadow-slate-200/50"
        )}>
          <div onClick={() => scrollToSection(heroRef, 'hero')} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md">
              FF
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block">Fahalullah Fahim</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400 font-medium block -mt-1">CSE Portfolio</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-800/20 dark:bg-slate-800/40 p-1 rounded-xl border border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref, item.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer",
                  activeSection === item.id 
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30" 
                    : theme === 'dark' ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={cn(
                "p-2.5 rounded-xl border transition-all cursor-pointer",
                theme === 'dark' ? "bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-700/80" : "bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200"
              )}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="https://github.com/Fahim183"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all hover:border-purple-500",
                theme === 'dark' ? "bg-slate-800/60 border-slate-700 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"
              )}
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              className={cn(
                "md:hidden p-2.5 rounded-xl border cursor-pointer",
                theme === 'dark' ? "bg-slate-800/80 border-slate-700 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"
              )}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className={cn(
            "md:hidden mt-2 p-4 rounded-2xl border backdrop-blur-2xl shadow-2xl flex flex-col gap-2 max-w-6xl mx-auto",
            theme === 'dark' ? "bg-slate-900/95 border-slate-800 text-slate-200" : "bg-white/95 border-slate-200 text-slate-800"
          )}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref, item.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-all",
                  activeSection === item.id 
                    ? "bg-purple-600 text-white" 
                    : theme === 'dark' ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-700"
                )}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://github.com/Fahim183"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center gap-2 text-purple-400"
            >
              <Github className="w-4 h-4" /> GitHub Profile
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section ref={heroRef} id="hero">
        <AetherFlowHero 
          theme={theme}
          onExploreClick={() => scrollToSection(projectsRef, 'projects')}
          onContactClick={() => scrollToSection(contactRef, 'contact')}
        />
      </section>

      {/* 3D Container Scroll Animation Showcase */}
      <section ref={showcaseRef} id="showcase" className="border-t border-slate-800/40 relative">
        <HeroScrollDemo />
      </section>

      {/* About */}
      <section ref={aboutRef} id="about" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={cn(
            "lg:col-span-7 p-8 rounded-3xl border backdrop-blur-md shadow-xl flex flex-col justify-between",
            theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
          )}>
            <div>
              <h2 className="text-3xl font-bold mb-4">About Fahalullah Fahim</h2>
              <p className={cn("leading-relaxed mb-6", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                Hello! I am <strong className="text-purple-400">Fahalullah Fahim</strong>, a dedicated Front-End & Full-Stack Web Developer located in Bangladesh. I am currently pursuing my B.Sc. in Computer Science & Engineering at <strong>Metropolitan University</strong>.
              </p>
              <p className={cn("leading-relaxed mb-8", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                I focus on clean code architecture, rapid communication, and delivering reliable software solutions that solve real-world problems.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/40">
              {[
                { title: 'Clean Code', icon: Code },
                { title: 'Responsive', icon: Layout },
                { title: 'Fast Delivery', icon: Zap },
                { title: 'Client First', icon: CheckCircle2 }
              ].map((badge, idx) => (
                <div key={idx} className={cn("p-3 rounded-2xl border flex flex-col items-center gap-2", theme === 'dark' ? "bg-slate-800/40 border-slate-700/50" : "bg-slate-50 border-slate-200")}>
                  <badge.icon className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-semibold">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "lg:col-span-5 p-8 rounded-3xl border backdrop-blur-md shadow-xl flex flex-col justify-between",
            theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"
          )}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Academic Credentials</h3>
                  <span className="text-xs font-mono text-purple-400">Metropolitan University</span>
                </div>
              </div>
              <div className={cn("p-5 rounded-2xl border mb-6", theme === 'dark' ? "bg-slate-800/30 border-slate-700/60" : "bg-slate-50 border-slate-200")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base">B.Sc. in CSE</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono">Undergraduate</span>
                </div>
                <p className={cn("text-xs leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                  Gaining practical experience in algorithms, software engineering, and hardware microcontrollers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Bangladesh — Open for Global Remote Work</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section ref={skillsRef} id="skills" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-slate-800/40">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12 text-center">Interactive Skill Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.id} className={cn("p-8 rounded-3xl border backdrop-blur-md shadow-xl", theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200")}>
              <div className="flex items-center gap-3 mb-6">
                <cat.icon className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="space-y-6">
                {cat.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-sm">{skill.name}</span>
                      <span className="text-xs font-mono text-purple-400">{skill.level}%</span>
                    </div>
                    <div className={cn("w-full h-2 rounded-full overflow-hidden mb-1", theme === 'dark' ? "bg-slate-800" : "bg-slate-200")}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    </div>
                    <p className={cn("text-xs mt-1", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section ref={projectsRef} id="projects" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-slate-800/40">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12">Featured Projects</h2>
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className={cn("p-8 rounded-3xl border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center", theme === 'dark' ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200")}>
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold">{project.category}</span>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">{t}</span>
                  ))}
                </div>
                <div className="pt-2">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all text-white text-xs font-semibold shadow-md shadow-purple-600/20">
                    <Github className="w-4 h-4" /> GitHub Repository
                  </a>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono text-slate-400">
                    <span>Source Preview</span>
                    <span>JavaScript / C++</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed">
                    <code>{project.codePreview}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} id="services" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-slate-800/40">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12 text-center">Services Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className={cn("p-8 rounded-3xl border flex items-start gap-5", theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200")}>
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 shrink-0">
                <service.icon className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} id="contact" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-bold">Contact Fahalullah Fahim</h2>
            <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
              Looking for a front-end developer, landing page designer, or full-stack engineer? Get in touch today.
            </p>
            <div className="space-y-3">
              <a href="mailto:fahalullahfahim0108@gmail.com" className="p-4 rounded-xl border flex items-center gap-3 bg-slate-900/60 border-slate-800 hover:border-purple-500 transition-all">
                <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-sm font-semibold break-all">fahalullahfahim0108@gmail.com</span>
              </a>
              <a href="https://github.com/Fahim183" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border flex items-center gap-3 bg-slate-900/60 border-slate-800 hover:border-purple-500 transition-all">
                <Github className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-sm font-semibold">github.com/Fahim183</span>
              </a>
              <a href="https://www.linkedin.com/in/fahalullah-fahim-7198502a4" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border flex items-center gap-3 bg-slate-900/60 border-slate-800 hover:border-purple-500 transition-all">
                <Linkedin className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-sm font-semibold">LinkedIn Profile</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className={cn("p-8 rounded-3xl border shadow-xl", theme === 'dark' ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200")}>
              {contactSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">Message Received!</h3>
                  <p className="text-sm text-slate-400">Thank you for getting in touch. I will reply to you via email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      placeholder="e.g. Alex Hunter" 
                      className="w-full p-3.5 rounded-xl border bg-slate-950/80 border-slate-800 text-sm outline-none focus:border-purple-500 transition-all text-slate-100" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">Your Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      placeholder="e.g. alex@example.com" 
                      className="w-full p-3.5 rounded-xl border bg-slate-950/80 border-slate-800 text-sm outline-none focus:border-purple-500 transition-all text-slate-100" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-400">Your Message</label>
                    <textarea 
                      rows={4} 
                      required 
                      value={formData.message} 
                      onChange={(e) => setFormData({...formData, message: e.target.value})} 
                      placeholder="Hi Fahim, I would like to discuss a project..." 
                      className="w-full p-3.5 rounded-xl border bg-slate-950/80 border-slate-800 text-sm outline-none focus:border-purple-500 transition-all text-slate-100 resize-none" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/25"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-800/80">
        © 2026 Fahalullah Fahim. Built with React, Tailwind CSS & Framer Motion.
      </footer>
    </div>
  );
}
