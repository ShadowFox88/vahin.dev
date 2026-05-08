import { FRIENDS } from "@/utils/contants";

export default function Friends() {
    return (
        <div className="pt-2 pb-8 flex gap-3 w-full max-w-4xl">
            {FRIENDS.map((friend) =>
                <a
                    href={friend.site}
                    key={friend.name + "_card"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group flex-1 min-w-0 font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center group"
                >

                    {friend.name === "Faaz" ? (
                        <div className="absolute -top-2 -right-2 bg-black border border-amber-600/60 text-amber-600/80 text-[8px] uppercase tracking-widest px-1.5 py-0.5">
                            contributor
                        </div>
                    ) : ""}

                    <div className="flex-none w-10 h-10 overflow-hidden border border-amber-600/20 transition-all duration-200">
                        {friend.image}
                    </div>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                        <p className="text-amber-600/40 text-[10px] uppercase tracking-widest">
                            // friend
                        </p>
                        <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate">
                            {friend.name}
                        </p>
                        <p className="text-amber-600/30 text-[10px] tracking-wider truncate">
                            @{friend.githubUsername}
                        </p>
                    </div>
                    <p className="ml-auto text-amber-600/30 group-hover:text-amber-500/60 text-xs transition-all duration-200 self-center">
                        →
                    </p>
                </a>
            )}
        </div>
    );
}


