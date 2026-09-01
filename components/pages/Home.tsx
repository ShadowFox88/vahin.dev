import Image from "next/image";

import Section from "../common/Section";
import PostGrid from "../common/Posts";

import { PinnedRepositories, Commits } from "../common/Github";

import Friends from "../common/Friends";
import Socials from "../common/Socials";

import { getBlogPosts } from '@/lib/content';

import avatar from "@/public/images/avatar.png"

export async function Home() {
    return (
        <div>
            <Section index="01" label="about me" heading="origin">
                <div className="border-amber-600/20 border-2 p-5 mb-5 flex rounded-sm">
                    <Image
                        width={94}
                        height={94}
                        src={avatar.src}
                        quality={75}
                        alt="profile pic"
                        className="mr-5 shrink-0 w-16 h-16 sm:w-24 sm:h-24"
                    />
                    <div>
                        <p className="text-2xl text-amber-400/80">Vahin</p>
                        <br />
                        <p className="leading-relaxed text-amber-600/40">
                            I am a developer from the UK who likes coding as a hobby.
                        </p>
                    </div>
                </div>
            </Section>

            <Section index="02" label="socials" heading="where to find me">
                <Socials />
            </Section>

            <Section index="03" label="great people" heading="friends">
                <Friends />
            </Section>

            <Section index="04" label="projects" heading="pinned repositories">
                <PinnedRepositories username="shadowfox88" />
            </Section>

            <Section index="05" label="blog posts" heading="my thoughts">
                <PostGrid posts={getBlogPosts(3)} />
            </Section>

            <Section index="06" label="log" heading="commit log · recent">
                <Commits username="shadowfox88" repo="vahin.dev" />
            </Section>
        </div>
    );
}