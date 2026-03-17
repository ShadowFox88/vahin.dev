import Image from 'next/image'
import dep_avatar from "@/images/dep-avatar.jpg"
import willi_avatar from "@/images/willi-avatar.jpg"
import ducki_avatar from "@/images/ducki-avatar.jpg"

export const SOCIALS: { name: string; href: string; icon: React.ReactNode }[] = [
    {
        name: "Discord",
        href: "https://discord.com/users/606648465065246750",
        icon: <Image />,
    },
    {
        name: "GitHub",
        href: "https://github.com/ShadowFox88",
        icon: <Image />,
    },
    {
        name: "Email",
        href: "mailto:vahin@vahin.dev",
        icon: <Image />,
    },
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