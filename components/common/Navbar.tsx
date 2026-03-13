"use client"

import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pages = ["Home", "Blog", "Contact", "Quick Links"];
    const paths = ["/", "/blog", "/contact", "/links"];
    const numbers = Object.keys(pages).map((index: string) => Number(index))
    const blueIndex = paths.indexOf(usePathname())

    

    return (
        <div className="pt-10 pb-5 flex  sticky top-0 bg-background max-w-5xl mx-auto">
            <p className="block float-left top-0 text-cyan-700 font-bold">Vahin Mehra</p>
            <ul className="list-none m-0 absolute right-0">
                {numbers.map((index: number) => (
                    <li 
                    key={pages[index]} 
                    className="block float-left p-5 -mt-5">
                    
                    {
                        <a
                        className={`hover:text-cyan-900 ${blueIndex == index ? `text-cyan-500` : ""}`}
                        href={paths[index]}
                        >{pages[index]}</a>
                    }

                    </li>
                ))}
            </ul>
        </div>
    )
}