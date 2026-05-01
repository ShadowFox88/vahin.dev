"use client"

import { useEffect, useRef, useState } from "react";
// hi there's a chat at the bottom
// please click
// if it says blocked pls copy link from devtools network and open it
// then try again
// nithi say hi if you see this
export default function Background() {
    let bg_list = [];
    const canvasRef = useRef(null);
    const [isClient, setIsClient] = useState(false)

    const svg = <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
        <line x1="0" x2="100" y1="50" y2="50" stroke="white" strokeWidth="1" opacity="0.4" />
        <line x1="50" x2="50" y1="0" y2="100" stroke="white" strokeWidth="1" opacity="0.4" />
        <line x1="42.5" x2="57.5" y1="50" y2="50" stroke="white" strokeWidth="3" opacity="0.4" />
        <line x1="50" x2="50" y1="42.5" y2="57.5" stroke="white" strokeWidth="3" opacity="0.4" />
    </svg>

    const drawCell = (ctx: any, x: number, y: number, size: number) => {
        const ratio = window.innerWidth/2560
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
        setIsClient(true)

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.imageSmoothingEnabled= false

        const draw = (w: number, h: number) => {
            ctx.clearRect(0, 0, w, h);

            const size = window.innerWidth / 10;
            ctx.globalAlpha = 0.4;
            ctx.strokeStyle = "white";

            for (let x = 0; x < w; x += size) {
                for (let y = 0; y < h; y += size) {
                    drawCell(ctx, x, y, size);
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

    for (let i = 0; i < 5000; i++) {
        bg_list.push(Math.random().toString(36).toUpperCase().substring(2, 3));
    }

    return <div className="max-h-screen overflow-hidden fixed inset-0 -z-10">
        <div className="flex flex-wrap text-[4px] text-white opacity-40">
            {bg_list.map((char, index) => <div key={char + index.toString() + "_bg"} className="p-2">{isClient ? char : null}</div>)}
        </div>
        <canvas className="fixed inset-0 -z-10 pointer-events-none" ref={canvasRef} style={{
            image-rendering: "pixelated";
            image-rendering: "crisp-edges";

        }} />
    </div>
}
// "use client"

// 

// export default function Background() {

//   return (
//     <canvas
//       ref={canvasRef}
//       className=""
//     />
//   );
// }