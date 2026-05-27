"use client";
import { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const randomScramble = (length: number) => Array.from({ length }, () => randomChar()).join("");

interface ScrambleTextProps {
    text: string;
    className?: string;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
    const [correct, setCorrect] = useState(text)
    const [scrambled, setScrambled] = useState("")
    const played = useRef(false)
    const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const scramble = () => {
        if (played.current) return

        let i = 0
        setCorrect("")
        setScrambled(randomScramble(text.length))
        played.current = true

        clearInterval(animRef.current!);
        animRef.current = setInterval(() => {
            i += 1
            setCorrect(text.slice(0, i))
            setScrambled(randomScramble(text.length - i))
            if (i >= text.length) {
                played.current = false;
                clearInterval(animRef.current!);
            }
        }, 45)
    }

    return (
        <span className={className} onMouseEnter={scramble}>
            <span>{correct}</span>
            <span className="text-amber-600/40">{scrambled}</span>
        </span>
    );
}