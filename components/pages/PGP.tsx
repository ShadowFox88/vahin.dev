import fs from 'fs';
import path from 'path';

import CopyButton from '../common/CopyButton';
import { PGP_FINGERPRINT } from "@/utils/contants"

export function PGP() {
    const key = fs.readFileSync(path.join(process.cwd(), 'public', 'pgp.asc'), 'utf-8');

    return (
        <main className="min-h-screen bg-black p-8 max-w-3xl mx-auto flex flex-col gap-8">
            <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                    <p className="text-amber-600/40 text-xs uppercase tracking-widest">// fingerprint</p>
                    <p className="text-amber-600/80 font-mono text-xs">{PGP_FINGERPRINT}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-amber-600/40 text-xs uppercase tracking-widest">// usage</p>
                    <p className="text-amber-600/60 text-xs font-mono">gpg --import pgp.asc</p>
                </div>
                <a href="/pgp.asc" download className="ml-auto border border-amber-600/40 text-amber-600/80 text-xs uppercase tracking-widest px-4 py-2 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse hover:border-amber-600 hover:scale-105 transition-all duration-200 self-start">
                    download key
                </a>
            </div>
            <div>
                <p className="text-amber-600/40 text-xs uppercase tracking-widest mb-2">// pgp key</p>
                <div className="relative">
                    <pre className="text-amber-600/80 text-xs font-mono whitespace-pre overflow-x-auto border border-amber-600/20 p-4 rounded-sm">
                        {key}
                    </pre>
                    <CopyButton text={key}/>
                </div>
            </div>
        </main>
    );
}