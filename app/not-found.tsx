"use client"

import Link from 'next/link'
import Command from '@/components/common/Command'
import { usePathname } from 'next/navigation'

export default function NotFound() {
    return (
        <div className="min-h-[75vh] font-mono p-8 flex flex-col items-center justify-center">
            <div className="bg-zinc-950 w-180 h-5 flex gap-2 items-center pt-6 pb-6 rounded-t-xl">
                <Link href="/">
                    <span className="bg-red-700 hover:bg-red-700/50 transition-all duration-200 block w-3 h-3 rounded-full ml-5"></span>
                </Link>
                <Link href="/">
                    <span className="bg-yellow-400 hover:bg-yellow-400/50 transition-all duration-200 block w-3 h-3 rounded-full"></span>
                </Link>
                <span className="bg-green-500 hover:bg-green-500/50 transition-all duration-200 block w-3 h-3 rounded-full"></span>
            </div>
            <div className="max-w-180 p-5 pr-50 pt-0 bg-zinc-950 rounded-b-xl">
                    <Command command="cat content.html" className="ml-0"  />
                    <div className="mt-5 text-sm text-red-500">Error: "{usePathname()}" cannot be located. No such file or directory.</div>
                    <div className="mt-5 mb-10 text-xs text-gray-500">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</div>

                    <Command command="exit" className="ml-0" />
                    <div className="text-orange-500 mb-5 text-sm">Process finished with exit code 404</div>
                    <Link className="hover:text-cyan-900 transition-all duration-200" href="/">[ home ]</Link>
            </div>
        </div>
    )
}