"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
    const pages = ["[ home ]", "[ blog ]", "[ projects ]", "[ contact ]"];
    const paths = ["/", "/blog", "/projects", "/contact"];
    const numbers = Object.keys(pages).map((index: string) => Number(index))
    const blueIndex = paths.indexOf(usePathname())

    return (
        <div className="sticky top-0 bg-background max-w-5xl -ml-5 z-10">
            <div className="pt-10 pb-5 flex flex-row mx-auto max-w-3xl">
                <p className="block float-left top-0 text-cyan-700 font-bold">[ Vahin ]</p>
                <ul className="list-none m-0 absolute right-0">
                    {numbers.map((index: number) => (
                        <li
                            key={pages[index]}
                            className="block float-left p-5 pl-1 pr-1 -mt-5">

                            {
                                <Link
                                    className={`hover:text-lime-400/75 ${blueIndex == index ? `text-cyan-500` : ""} transition-all duration-200`}
                                    href={paths[index]}
                                >{pages[index]}</Link>
                            }

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}