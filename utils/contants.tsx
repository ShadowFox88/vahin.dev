import Image from 'next/image'

import dep_avatar from "@/images/dep-avatar.jpg"
import willi_avatar from "@/images/willi-avatar.jpg"
import ducki_avatar from "@/images/ducki-avatar.jpg"

import discord from "@/icons/discord.svg"
import github from "@/icons/github.svg"
import gmail from "@/icons/gmail.svg"
import spotify from "@/icons/spotify.svg"
import lastfm from "@/icons/lastfm.svg"
import anilist from "@/icons/anilist.svg"

import { Kode_Mono } from "next/font/google"

export const KodeMono = Kode_Mono({
    variable: "--font-kode-mono",
    subsets: ["latin"],
});

export const SOCIALS: { name: string; href: string; icon: React.ReactNode, username: string }[] = [
    {
        name: "Discord",
        href: "https://discord.com/users/606648465065246750",
        icon: <Image src={discord.src} width="60" height="60" alt="discord logo" className="mr-2 mt-1"/>,
        username: "flyingdog."
    },
    {
        name: "GitHub",
        href: "https://github.com/ShadowFox88",
        icon: <Image src={github.src} width="60" height="60" alt="github logo" className="mr-2"/>,
        username: "ShadowFox88"
    },
    {
        name: "Email",
        href: "mailto:vahin@vahin.dev",
        icon: <Image src={gmail.src} width="60" height="60" alt="gmail logo" className="mr-2"/>,
        username: "vahin@vahin.dev",
    },
    {
        name: "Spotify",
        href: "https://open.spotify.com/user/me9tp8y86bqius449ol8pff0n",
        icon: <Image src={spotify.src} width="60" height="60" alt="spotify logo" className="mr-2"/>,
        username: "Vahin",
    },
    {
        name: "Last.fm",
        href: "https://www.last.fm/user/ShadowFox88",
        icon: <Image src={lastfm.src} width="60" height="60" alt="last.fm logo" className="mr-2"/>,
        username: "ShadowFox88",
    },
    {
        name: "Anilist",
        href: "https://anilist.co/user/flyingdog/",
        icon: <Image src={anilist.src} width="60" height="60" alt="last.fm logo" className="mr-2 rounded-md"/>,
        username: "flyingdog"
    }
];

export const FRIENDS = [
    {
        name: "Willi",
        githubUsername: "itswilliboy",
        githubId: 83978878,
        site: "https://itswilli.dev/",
        image: <Image src={willi_avatar.src} width="60" height="60" alt="profile_pic" className="mr-2" />,
    },
    {
        name: "Dep",
        githubUsername: "Deprecatism",
        githubId: 70801324,
        site: "https://deppie-dev.vercel.app/",
        image: <Image src={dep_avatar.src} width="60" height="60" alt="profile_pic" className="mr-2" />,
    },
    {
        name: "Faaz",
        githubUsername: "du-cki",
        githubId: 70286349,
        site: "https://faaz.dev",
        image: <Image src={ducki_avatar.src} width="60" height="60" alt="profile_pic" className="mr-2" />,
    },
];