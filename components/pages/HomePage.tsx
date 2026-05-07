import LoremIpsum from "../common/LoremIpsum";
import Friends from "../common/Friends";
import Image from "next/image";
import Section from "../common/Section";

import avatar from "@/images/avatar.png"
import Links from "../common/Socials";

export default async function HomePage() {
    return (
        <div>
            <Section index="01" label="about me" heading="origin">
                <div className="border-amber-600/20 border-2 p-5 mb-5 flex">
                    <Image
                        width={94}
                        height={94}
                        src={avatar.src}
                        quality={75}
                        alt="profile pic"
                        className="mr-5"
                    />
                    <div>
                        <p className="text-2xl text-amber-400/80">Vahin</p>
                        <br />
                        <p className="leading-relaxed text-amber-600/40">
                            I am a 17 year old developer from the UK who likes coding as a hobby.
                        </p>
                    </div>
                </div>
            </Section>

            <Section index="02" label="socials" heading="where to find me">
                <Links />
            </Section>

            <Section index="03" label="great people" heading="friends">
                <Friends />
            </Section>

            <Section index="04" label="lorem ipsum" heading="stuff">
                <LoremIpsum paragraphs={20} />
            </Section>
        </div>
    );
}