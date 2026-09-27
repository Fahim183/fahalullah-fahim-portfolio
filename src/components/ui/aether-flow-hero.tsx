"use client";

import React, { useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Zap, ArrowRight, Mail } from 'lucide-react';

interface AetherFlowHeroProps {
    theme?: string;
    onExploreClick?: () => void;
    onContactClick?: () => void;
}

export default function AetherFlowHero({ 
    theme = 'dark', 
    onExploreClick, 
    onContactClick 
}: AetherFlowHeroProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse: { x: number | null; y: number | null; radius: number } = { 
            x: null, 
            y: null, 
            radius: 180 
        };

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (!canvas) return;
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius + this.size) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= forceDirectionX * force * 4;
                        this.y -= forceDirectionY * force * 4;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            if (!canvas) return;
            particles = [];
            const numberOfParticles = Math.floor((canvas.height * canvas.width) / 9500);
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 2) + 1;
                const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                const y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                const directionX = (Math.random() * 0.4) - 0.2;
                const directionY = (Math.random() * 0.4) - 0.2;
                const color = theme === 'dark' ? 'rgba(168, 85, 247, 0.8)' : 'rgba(124, 58, 237, 0.8)';
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); 
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const connect = () => {
            if (!canvas || !ctx) return;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        const opacityValue = 1 - (distance / 18000);
                        
                        let strokeColor = theme === 'dark' 
                            ? `rgba(168, 85, 247, ${opacityValue * 0.4})` 
                            : `rgba(139, 92, 246, ${opacityValue * 0.3})`;

                        if (mouse.x !== null && mouse.y !== null) {
                            const dx_mouse_a = particles[a].x - mouse.x;
                            const dy_mouse_a = particles[a].y - mouse.y;
                            const distance_mouse_a = Math.sqrt(dx_mouse_a * dx_mouse_a + dy_mouse_a * dy_mouse_a);

                            if (distance_mouse_a < mouse.radius) {
                                strokeColor = theme === 'dark' 
                                    ? `rgba(255, 255, 255, ${opacityValue})` 
                                    : `rgba(59, 130, 246, ${opacityValue})`;
                            }
                        }
                        
                        ctx.strokeStyle = strokeColor;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = theme === 'dark' ? '#020617' : '#f8fafc';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15 + 0.3,
                duration: 0.8,
                ease: "easeInOut",
            },
        }),
    };

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
            
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 backdrop-blur-md shadow-lg bg-purple-500/10 border-purple-500/30 text-purple-300"
                >
                    <Zap className="h-4 w-4 text-purple-500 animate-pulse" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                        Full-Stack Developer & Motion UI Specialist
                    </span>
                </motion.div>

                <motion.h1
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-blue-400 leading-none"
                >
                    Fahalullah Fahim
                </motion.h1>

                <motion.p
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-normal mb-8 leading-relaxed text-slate-300"
                >
                    CSE Student at Metropolitan University crafting high-performance full-stack applications, modern interactive interfaces, and fluid digital experiences.
                </motion.p>

                <motion.div
                    custom={3}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <button 
                        onClick={onExploreClick}
                        className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                    >
                        <span>Explore Featured Work</span>
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    <button 
                        onClick={onContactClick}
                        className="px-6 py-3.5 font-semibold rounded-xl border backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800"
                    >
                        <Mail className="h-4 w-4 text-purple-400" />
                        <span>Get In Touch</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
