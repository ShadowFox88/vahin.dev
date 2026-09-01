"use client"

import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'

export function Navbar() {
    const pages = ["home", "blog", "projects", "notes", "status"];
    const paths = ["/", "/blog", "/projects", "/notes", "/status"];
    const numbers = Object.keys(pages).map((index: string) => Number(index))
    const blueIndex = paths.indexOf(usePathname())
    const [open, setOpen] = useState(false)

    return (
        <div className="relative px-6 z-10 border-b border-neutral-700/50 bg-background">
            <div className="pt-6 pb-5 flex flex-row justify-between items-center">
                <p className="text-cyan-700 font-bold">[ Vahin ]</p>

                <button
                    className="sm:hidden text-amber-600/60 text-xs tracking-widest uppercase font-mono inline-block hover:text-lime-400/75 hover:scale-105 transition-all duration-200"
                    onClick={() => setOpen(o => !o)}
                >
                    {open ? "[ close ]" : "[ menu ]"}
                </button>

                <ul className={`${open ? "flex" : "hidden"} sm:flex flex-col sm:flex-row absolute sm:relative top-full sm:top-auto left-0 sm:left-auto w-full sm:w-auto bg-background sm:bg-transparent border-b sm:border-none border-neutral-700/30 px-6 py-4 sm:p-0 gap-3 sm:gap-2 z-20`}>
                    {numbers.map((index: number) => (
                        <li key={pages[index]}>
                            <Link
                                className={`whitespace-nowrap hover:text-lime-400/75 hover:scale-115 transition-all duration-200 inline-block text-xs ${blueIndex == index ? "text-cyan-500" : ""}`}
                                href={paths[index]}
                                onClick={() => setOpen(false)}
                            >[ {pages[index]} ]</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function Footer() {
    return ( 
        <footer className="bottom-0 inset-x-0 mx-auto text-center mb-10 text-xs">
            <p> &copy; {new Date().getFullYear()} Vahin. All Rights Reserved</p>
        </footer>
    );
}

export function Background() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef<{ x: number; y: number } | null>(null);
    const randomRef = useRef(Math.random())

    const drawCell = (ctx: any, x: number, y: number, size: number) => {
        const ratio = window.innerWidth / 2560;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + size / 2);
        ctx.lineTo(x + size, y + size / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size);
        ctx.stroke();
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + size / 2 - (8 * ratio), y + size / 2);
        ctx.lineTo(x + size / 2 + (8 * ratio), y + size / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y + size / 2 - (8 * ratio));
        ctx.lineTo(x + size / 2, y + size / 2 + (8 * ratio));
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (ctx == null) return;
        ctx.imageSmoothingEnabled = false;

        const draw = (w: number, h: number) => {
            ctx.clearRect(0, 0, w, h);
            const size = window.innerWidth / 10;
            const mouse = mouseRef.current;
            const radius = size * 1.8;

            // base grid
            ctx.strokeStyle = "oklch(76.9% 0.188 70.08)";
            for (let x = 0; x < w; x += size) {
                for (let y = 0; y < h; y += size) {
                    const dist = mouse
                        ? Math.hypot(x + size / 2 - mouse.x, y + size / 2 - mouse.y)
                        : Infinity;
                    const proximity = mouse && dist < radius ? 1 - dist / radius : 0;
                    ctx.globalAlpha = 0.06 + proximity * 0.25;
                    drawCell(ctx, x, y, size);
                }
            }

            // background letters
            ctx.fillStyle = "oklch(76.9% 0.188 70.08)";
            const char_size = 25000 / window.innerWidth;
            for (let x = 1; x < w; x += char_size) {
                for (let y = 0; y < h + 1; y += char_size + 4) {
                    const dist = mouse
                        ? Math.hypot(x - mouse.x, y - mouse.y)
                        : Infinity;
                    const proximity = mouse && dist < radius ? 1 - dist / radius : 0;
                    ctx.globalAlpha = 0.03 + proximity * 0.12;
                    // makes the value the same for the given screen resolution, but has a random num
                    // as defined above so on reload we get different characters
                    // also loops to be between 0 and 1 to replace the Math.Random i had before
                    const char = (((x + y / randomRef.current) % 1 + 1) % 1).toString(36).toUpperCase().substring(2, 3);
                    ctx.font = `${char_size}px "Kode Mono", monospace`;
                    ctx.fillText(char, x, y);
                }
            }
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const onMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        let animFrameId: number;
        const loop = () => {
            const dpr = window.devicePixelRatio || 1;
            draw(canvas.width / dpr, canvas.height / dpr);
            animFrameId = requestAnimationFrame(loop);
        };

        resize();
        loop();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(animFrameId);
        };
    }, []);

    return (
        <canvas
            className="fixed inset-0 -z-10 pointer-events-none max-h-screen overflow-hidden blur-[2px] h-screen w-screen"
            ref={canvasRef}
        />
    );
}