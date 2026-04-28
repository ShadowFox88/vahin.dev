import { FRIENDS } from "@/utils/contants";

export default function Friends() {
    return (
        <div className="p-5 pl-0 pt-0 self-center flex gap-2">
            { FRIENDS.map((friend) =>
                <a href={friend.site} key={friend.name + "_card"} target="_blank" rel="noopener noreferrer" className="flex-none tracking-tight border-neutral-700 hover:border-purple-400/50 transition-all duration-250 hover:bg-purple-400/5 border-2 w-60 h-20 p-2 flex">
                        {friend.image}

                        <div className="block">
                            <p className="text-xs uppercase tracking-wider">
                                friend
                            </p>
                            <p className="text-sm text-purple-400">{friend.name}</p>
                            <p className="text-xs">@{friend.githubUsername}</p>
                        </div>

                        <div className="grow"></div>

                        <p className="self-center text-xs">→</p>
                </a>
            )}

        </div>
    )
}