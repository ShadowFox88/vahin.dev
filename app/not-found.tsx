"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from "react";

const CHAR_DURATION = 30
const LINE_DURATION = 300

type LINE = {
    text: string,
    color: string,
    command: boolean,
    extra?: string,
}

const getLines = (pathname: string) => [
    {
        text: "cat content.html",
        color: "text-foreground",
        command: true,
        extra: "p-2"
    },
    {
        text: `Error: ${pathname} cannot be located. No such file or directory exists.`,
        color: "text-red-500",
        command: false,
        extra: "text-sm pl-2"
    },
    {
        text: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
        color: "text-gray-400",
        command: false,
        extra: "text-xs pl-2 pt-5"
    },
    {
        text: "exit",
        color: "text-foreground",
        command: true,
        extra: "pt-10 pl-2"
    },
    {
        text: "Process finished with exit code 404",
        color: "text-orange-500",
        command: false,
        extra: "pl-2 text-sm"
    },
]

export default function NotFound() {
    const LINES = getLines(usePathname())
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
        <div className="min-h-[75vh] font-mono p-8 flex flex-col items-center justify-center">
            <div className="bg-zinc-950 max-w-3xl w-180 h-5 flex gap-2 items-center pt-6 pb-6 rounded-t-xl">
                <Link href="/">
                    <span className="bg-red-700 hover:bg-red-700/50 hover:scale-110 transition-all duration-200 block w-3 h-3 rounded-full ml-5">
                        <svg className="opacity-0 hover:opacity-100 transition-opacity duration-200" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <line x1="3" y1="3" x2="9" y2="9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="9" y1="3" x2="3" y2="9" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </span>
                </Link>
                <Link href="/">
                    <span className="bg-yellow-400 hover:bg-yellow-400/50 hover:scale-110 transition-all duration-200 block w-3 h-3 rounded-full">
                        <svg className="opacity-0 hover:opacity-100 transition-opacity duration-200" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <line x1="3" y1="6" x2="9" y2="6" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                        </svg></span>
                </Link>
                <Link href="/">
                    <span className="bg-green-500 hover:bg-green-500/50 hover:scale-110 transition-all duration-200 block w-3 h-3 rounded-full">
                        <svg className="opacity-0 hover:opacity-100 transition-opacity duration-200" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="6,3 9,3 9,6" fill="black" stroke="black" strokeWidth="1" strokeLinejoin="round" />
                            <polygon points="6,9 3,9 3,6" fill="black" stroke="black" strokeWidth="1" strokeLinejoin="round" />
                        </svg>
                    </span>
                </Link>
            </div>
            <div className="max-w-3xl w-180 p-5 pr-50 pt-0 bg-zinc-950 rounded-b-xl">
                {content.map((line) => 
                    <p className={`${line.extra} ${line.color}`} key={`${line.text}}`}>
                        {line.command && <span className="text-purple-500 ml-0">$ </span>}
                        {line.text}
                        {index == LINES.length || LINES[index].text.startsWith(line.text) && "▋"}
                    </p>
                )}
                {index == LINES.length && (
                    <Link className="hover:text-lime-400/75 transition-all duration-200 hover:scale-105 inline-block pt-10 pl-2" href="/">[ home ]</Link>
                )}
            </div>
        </div>
    )
}