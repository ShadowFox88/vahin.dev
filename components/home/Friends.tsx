import { FRIENDS } from "@/utils/contants";
import dep_avatar from "@/images/dep-avatar.jpg"
import Image from 'next/image'
import Link from "next/link";

export default function Friends() {
    return (
        <div className="p-5 w-xs max-w-xs">
            <h1>Friends</h1>
            <div className="grid gap-2 max-w-xs">
                { FRIENDS.map((friend) =>
                    <a href={friend.site} key={friend.name + "_card"} target="_blank" rel="noopener noreferrer">
                        <div className="border-white hover:border-cyan-900 hover:bg-cyan-900/5 border-2 w-sm h-20 p-2 flex max-w-xs">
                            {friend.image}

                            <div className="block">
                                <p className="text-xl">{friend.name}</p>
                                <p className="text-sm">@{friend.githubUsername}</p>
                            </div>

                            <div className="grow"></div>

                            <p className="self-center">→</p>
                        </div>
                    </a>
                )}
            </div>

        </div>
    )
}