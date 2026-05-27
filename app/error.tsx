"use client"

import Link from 'next/link'
import { useEffect, useRef, useState } from "react"

const CHAR_DURATION = 30
const LINE_DURATION = 300

type LINE = {
    text: string,
    color: string,
    command: boolean,
    extra?: string,
}

const LINES: LINE[] = [
    {
        text: "run app.exe",
        color: "text-foreground",
        command: true,
        extra: "p-2"
    },
    {
        text: "FATAL: unhandled exception — process terminated",
        color: "text-red-500",
        command: false,
        extra: "text-sm pl-2"
    },
    {
        text: "SIGABRT: core dumped",
        color: "text-red-500/60",
        command: false,
        extra: "text-xs pl-2"
    },
    {
        text: "Something went wrong on our end. Please try again.",
        color: "text-gray-400",
        command: false,
        extra: "text-xs pl-2 pt-5"
    },
]

export default function Error({ reset }: { reset: () => void }) {
    const [content, setContent] = useState<Array<LINE>>([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index == LINES.length) return

        const timers: NodeJS.Timeout[] = []

        for (let i = 0; i <= LINES[index].text.length; i++) {
            timers.push(setTimeout(() => {
                let result = []
                for (let j = 0; j < index; j++) {
                    result.push(LINES[j])
                }
                result.push({...LINES[index], text: LINES[index].text.slice(0, i)})
                setContent(result)
            }, i * CHAR_DURATION))
        }

        timers.push(setTimeout(() => setIndex(index + 1), LINES[index].text.length * CHAR_DURATION + LINE_DURATION))
        return () => timers.forEach(clearTimeout)
    }, [index])

    return (
        <div className="min-h-[75vh] font-mono p-8 flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-3">
                <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32,8 L56,52 Q57,54 55,54 L9,54 Q7,54 8,52 Z" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                    <line x1="32" y1="24" x2="32" y2="38" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="32" cy="46" r="2" fill="#ef4444"/>
                </svg>
                <p className="text-red-500 uppercase tracking-widest text-xs">system failure</p>
            </div>
            <div className="bg-zinc-950 max-w-3xl w-full flex gap-2 items-center pt-6 pb-6 rounded-t-xl">
                <span className="bg-red-700 block w-3 h-3 rounded-full ml-5" />
                <span className="bg-yellow-400 block w-3 h-3 rounded-full" />
                <span className="bg-green-500 block w-3 h-3 rounded-full" />
            </div>
            <div className="max-w-3xl w-full p-5 pt-0 bg-zinc-950 rounded-b-xl -mt-8">
                {content.map((line) =>
                    <p className={`${line.extra} ${line.color}`} key={line.text}>
                        {line.command && <span className="text-purple-500">$ </span>}
                        {line.text}
                        {index < LINES.length && LINES[index].text.startsWith(line.text) && <span className="animate-blink">▋</span>}
                    </p>
                )}
                {index == LINES.length && (
                    <div className="flex gap-4 pt-10 pl-2">
                        <button className="hover:text-lime-400/75 transition-all duration-200 hover:scale-105" onClick={reset}>[ retry ]</button>
                        <Link className="hover:text-lime-400/75 transition-all duration-200 hover:scale-105" href="/">[ home ]</Link>
                    </div>
                )}
            </div>
        </div>
    )
}