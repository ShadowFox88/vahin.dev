import Image from 'next/image'

import dep_avatar from "@/public/images/dep-avatar.jpg"
import willi_avatar from "@/public/images/willi-avatar.jpg"
import ducki_avatar from "@/public/images/ducki-avatar.jpg"
import viswa_avatar from "@/public/images/viswa-avatar.jpg"

import discord from "@/public/icons/discord.svg"
import github from "@/public/icons/github.svg"
import gmail from "@/public/icons/gmail.svg"
import spotify from "@/public/icons/spotify.svg"
import lastfm from "@/public/icons/lastfm.svg"
import anilist from "@/public/icons/anilist.svg"
import zipline from "@/public/icons/zipline.svg"
import jellyfin from "@/public/icons/jellyfin.svg"
import seerr from "@/public/icons/seerr.svg"
import mystbin from "@/public/icons/mystbin.svg"
import prowlarr from "@/public/icons/prowlarr.svg"
import radarr from "@/public/icons/radarr.svg"
import sonarr from "@/public/icons/sonarr.svg"
import qbittorrent from "@/public/icons/qbittorrent.svg"

import { Kode_Mono } from "next/font/google"

export const KodeMono = Kode_Mono({
    variable: "--font-kode-mono",
    subsets: ["latin"],
});

export const GITHUB_API_VERSION = "2026-03-10"
export const USER_AGENT = "vahin.dev (github.com/shadowfox88/vahin.dev)"

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export const STATUS_TOKEN = process.env.STATUS_TOKEN;

export const PGP_FINGERPRINT = "DCDE 8B23 B991 92C4 13BB 82AB 2618 AE42 B493 A43B"

export const SOCIALS: { name: string; href: string; icon: React.ReactNode, username: string }[] = [
    {
        name: "Discord",
        href: "https://discord.com/users/606648465065246750",
        icon: <Image src={discord.src} width="60" height="60" alt="discord logo" className="mr-2" />,
        username: "flyingdog."
    },
    {
        name: "GitHub",
        href: "https://github.com/ShadowFox88",
        icon: <Image src={github.src} width="60" height="60" alt="github logo" className="mr-2" />,
        username: "ShadowFox88"
    },
    {
        name: "Email",
        href: "mailto:vahin@vahin.dev",
        icon: <Image src={gmail.src} width="60" height="60" alt="gmail logo" className="mr-2" />,
        username: "vahin@vahin.dev",
    },
    {
        name: "Spotify",
        href: "https://open.spotify.com/user/me9tp8y86bqius449ol8pff0n",
        icon: <Image src={spotify.src} width="60" height="60" alt="spotify logo" className="mr-2" />,
        username: "Vahin",
    },
    {
        name: "Last.fm",
        href: "https://www.last.fm/user/ShadowFox88",
        icon: <Image src={lastfm.src} width="60" height="60" alt="last.fm logo" className="mr-2" />,
        username: "ShadowFox88",
    },
    {
        name: "Anilist",
        href: "https://anilist.co/user/flyingdog/",
        icon: <Image src={anilist.src} width="60" height="60" alt="last.fm logo" className="mr-2 rounded-md" />,
        username: "flyingdog"
    },
    {
        name: "PGP",
        href: "/pgp",
        icon: <svg width="42px" height="42px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 17.4286C15 16.9552 15.3838 16.5714 15.8571 16.5714H20.1429C20.6162 16.5714 21 16.9552 21 17.4286V19.1429C21 19.6162 20.6162 20 20.1429 20H15.8571C15.3838 20 15 19.6162 15 19.1429V17.4286Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.7143 15.2857C16.7143 14.5756 17.2899 14 18 14C18.7101 14 19.2857 14.5756 19.2857 15.2857V16.5714H16.7143V15.2857Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        username: "view key", // yes i know this isn't a username but im not changing everything for one damn thing.
    },
];



export const FRIENDS = [
    {
        name: "Willi",
        githubUsername: "itswilliboy",
        githubId: 83978878,
        site: "https://itswilli.dev/",
        image: <Image src={willi_avatar.src} width="60" height="60" alt="willi profile pic" className="mr-2" />,
    },
    {
        name: "Dep",
        githubUsername: "Deprecatism",
        githubId: 70801324,
        site: "https://deppie-dev.vercel.app/",
        image: <Image src={dep_avatar.src} width="60" height="60" alt="dep profile pic" className="mr-2" />,
    },
    {
        name: "Faaz",
        githubUsername: "du-cki",
        githubId: 70286349,
        site: "https://faaz.dev",
        image: <Image src={ducki_avatar.src} width="60" height="60" alt="faaz profile pic" className="mr-2" />,
    },
    {
        name: "Viswa",
        githubUsername: "justanotherbyte",
        githubId: 6226748,
        site: "https://viswa.space",
        image: <Image src={viswa_avatar.src} width="60" height="60" alt="viswa profile pic" className="mr-2" />,
    }
];

export const SERVICES = [
    {
        name: "zipline",
        url: "https://cdn.vahin.dev",
        icon: <Image src={zipline.src} width="60" height="60" alt="zipline icon" className="mr-2" />,
        tailscale: false,
    },
    {
        name: "jellyfin",
        url: "https://jellyfin.vahin.dev",
        icon: <Image src={jellyfin.src} width="60" height="60" alt="jellyfin icon" className="mr-2" />,
        tailscale: false,
    },
    {
        name: "seerr",
        url: "https://seerr.vahin.dev",
        icon: <Image src={seerr.src} width="60" height="60" alt="seerr icon" className="mr-2" />,
        tailscale: false,
    },
    {
        name: "mystbin",
        url: "https://paste.vahin.dev",
        icon: <Image src={mystbin.src} width="60" height="60" alt="mystbin icon" className="mr-2" />,
        tailscale: false,
    },
    {
        name: "prowlarr",
        url: "http://100.105.38.67:9696/prowlarr",
        icon: <Image src={prowlarr.src} width="60" height="60" alt="prowlarr icon" className="mr-2" />,
        tailscale: true,
    },
    {
        name: "radarr",
        url: "http://100.105.38.67:7878/radarr",
        icon: <Image src={radarr.src} width="60" height="60" alt="radarr icon" className="mr-2" />,
        tailscale: true,
    },
    {
        name: "sonarr",
        url: "http://100.105.38.67:8989/sonarr",
        icon: <Image src={sonarr.src} width="60" height="60" alt="sonarr icon" className="mr-2" />,
        tailscale: true,
    },
    {
        name: "qbittorrent",
        url: "http://100.105.38.67:8080",
        icon: <Image src={qbittorrent.src} width="60" height="60" alt="qbittorent icon" className="mr-2" />,
        tailscale: true,
    },
];