import LoremIpsum from "../common/LoremIpsum";
import Command from "../common/Command"
import Friends from "./Friends";

export default async function HomePage() {
    return (
        <div className="flex">
            <div className="max-w-2xl w-2xl">
                <Command command="whoami" className="-ml-5" />
                <div className="border-white border-2 p-5 text-lg">
                    <p>
                    Hi, I'm Vahin, a 17 year old software developer with delusions of
                    grandeur
                    </p>
                </div>

                <br />
                <br />
                <Command command="cat lorem_ipsum.txt | head -n 380" className="-ml-5" />
                <LoremIpsum paragraphs={20} />
            </div>

            <div className="pl-5">
                <Friends />
            </div>
        </div>
    );
}
