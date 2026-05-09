import { SOCIALS } from "@/utils/contants"
import Link from "next/link";

export default function Socials() {
    return (
        <div className="pt-2 pb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-4xl">
            {SOCIALS.map((social) =>
                <Link
                    href={social.href}
                    key={social.name + "_card"}
                    target={social.href.startsWith("/") ? "" : "_blank"} 
                    rel="noopener noreferrer"
                    className=" font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse p-2 flex gap-3 items-center group"
                >
                    <div className="w-10 h-10 overflow-hidden shrink-0">
                        {social.icon}
                    </div>
                    <div className="gap-0.5 overflow-hidden">
                        <p className="text-amber-600/40 text-[10px] uppercase tracking-widest">
                            // social
                        </p>
                        <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate">
                            {social.name}
                        </p>
                        <p className="text-amber-600/30 text-[10px] tracking-wider truncate">
                            &gt; {social.username}
                        </p>
                    </div>
                    <p className="ml-auto text-amber-600/30 group-hover:text-amber-500/60 text-xs transition-all duration-200 self-center">
                        →
                    </p>
                </Link>
            )}
        </div>
    );
}