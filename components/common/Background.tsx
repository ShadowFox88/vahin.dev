"use client"

import { useEffect, useRef } from "react";
import { KodeMono } from "@/utils/contants"

export default function Background() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const drawCell = (ctx: any, x: number, y: number, size: number) => {
        const ratio = window.innerWidth / 2560
        // thin cross
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + size / 2);
        ctx.lineTo(x + size, y + size / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size);
        ctx.stroke();

        // bold plus
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
        const ctx = canvas.getContext("2d");
        if (ctx == null) return;

        ctx.imageSmoothingEnabled = false

        const draw = (w: number, h: number) => {
            ctx.clearRect(0, 0, w, h);

            const size = window.innerWidth / 10;
            ctx.globalAlpha = 0.2;
            ctx.strokeStyle = "oklch(76.9% 0.188 70.08)";

            for (let x = 0; x < w; x += size) {
                for (let y = 0; y < h; y += size) {
                    drawCell(ctx, x, y, size);
                }
            }

            ctx.globalAlpha = 0.05;
            ctx.fillStyle = "oklch(76.9% 0.188 70.08)";

            // background letters
            let char_size = 25000 / (window.innerWidth)
            for (let x = 1; x < w; x = x + char_size) {
                for (let y = 0; y < h + 1; y += char_size + 4) {
                    let char = Math.random().toString(36).toUpperCase().substring(2, 3);
                    ctx.font = `${char_size}px "Kode Mono", monospace`;
                    ctx.fillText(char, x, y);
                }
            }
        };



        const resize = () => {
            const dpr = window.devicePixelRatio || 1;

            const width = window.innerWidth;
            const height = window.innerHeight;

            // set real pixel size
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // set display size (CSS size)
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // reset transform so drawing doesn't drift
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            draw(width, height);
        };

        resize();
        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return <div className="max-h-screen overflow-hidden absolute inset-0 -z-10 blur-[2px] h-screen w-screen">
        <div className="flex flex-wrap text-[4px] text-white opacity-40" id="text-bg">

        </div>
        <canvas className="fixed inset-0 -z-10 pointer-events-none" ref={canvasRef} />
    </div>
}