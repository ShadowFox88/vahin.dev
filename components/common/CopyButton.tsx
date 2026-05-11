"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={copy} className="absolute top-2 right-2 border rounded-sm border-amber-600/40 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse hover:scale-115 hover:text-amber-600 hover:border-amber-600 transition-all duration-200 bg-black text-amber-600/60 p-1.5 group"
            title="Copy key">
            {copied ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6 L5 9 L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="3" width="7" height="8" rx="0" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M3 3 L3 2 L10 2 L10 9 L8 9" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
            )}
        </button>
    );
}