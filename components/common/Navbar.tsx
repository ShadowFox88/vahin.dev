"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
    const pages = ["[ home ]", "[ blog ]", "[ projects ]", "[ contact ]"];
    const paths = ["/", "/blog", "/projects", "/contact"];
    const numbers = Object.keys(pages).map((index: string) => Number(index))
    const blueIndex = paths.indexOf(usePathname())
    const [open, setOpen] = useState(false)

    return (
        <div className="relative px-6 z-10 border-b border-neutral-700/50">
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
                                className={`whitespace-nowrap hover:text-lime-400/75 hover:scale-105 transition-all duration-200 inline-block text-xs ${blueIndex == index ? "text-cyan-500" : ""}`}
                                href={paths[index]}
                                onClick={() => setOpen(false)}
                            >{pages[index]}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}