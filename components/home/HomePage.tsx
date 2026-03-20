import LoremIpsum from "../common/LoremIpsum";
import Command from "../common/Command";
import Friends from "./Friends";
import Image from "next/image";

import avatar from "@/images/avatar.png"

export default async function HomePage() {
    return (
        <div>
            <Command command="whoami" className="-ml-5" />
                <div className="border-neutral-700 border-2 p-5 mb-5 flex">
                    <Image
                        width={94}
                        height={94}
                        src={avatar.src}
                        quality={100}
                        alt="profile pic"
                        className="mr-5"
                    />
                    <div>
                        <p className="text-2xl text-purple-400">
                            Vahin
                        </p>
                        <br />
                        <p className="leading-relaxed text-neutral-300">
                            I am a 17 year old developer from the UK who likes coding as a hobby.
                        </p>
                    </div>
                </div>

            <div className="flex flex-col">
                <Command command="cat friends.txt" className="-ml-5" />
                <Friends />
            </div>

            <Command command="cat lorem_ipsum.txt | head -n 380" className="-ml-5" />
            <LoremIpsum paragraphs={20} />
        </div>
    );
}
