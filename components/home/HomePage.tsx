import LoremIpsum from "../common/LoremIpsum";
import Command from "../common/Command";
import Friends from "./Friends";

export default async function HomePage() {
    return (
        <div>
            <Command command="whoami" className="-ml-5" />
            <div className="border-white border-2 p-5 mb-5 text-lg">
                <p>
                    Hi, I'm Vahin, a 17 year old software developer with delusions of
                    grandeur
                </p>
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
