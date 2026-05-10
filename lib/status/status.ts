import { STATUS_TOKEN } from "@/utils/contants";
import { JSX } from "react";

async function getStatus(service: string): Promise<boolean> {
    const req = await fetch(`https://status.vahin.dev/status?service=${service}`, {
        headers: {
            Authorization: `Bearer ${STATUS_TOKEN}`,
        },
        next: {
            revalidate: 60,
        },
    });

    if (!req.ok) {
        return false
    }

    const status = await req.json();

    return status.online;
}


export async function isOnline(service: {name: string, url: string, icon: JSX.Element, tailscale: boolean}): Promise<boolean> {
    if (service.tailscale) {
        return getStatus(service.name)
    }

    const req = await fetch(service.url, {
        next: {
            revalidate: 60,
        },
    })

    return req.status < 500;
}