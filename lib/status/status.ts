export type ServiceStatus = {
    name: string;
    online: boolean;
    fetchedAt: string;
};

type ServicesResponse = Record<string, {
    Name: string;
    Online: boolean;
    FetchedAt: string;
}>;

export async function getServices(): Promise<ServiceStatus[]> {
    const req = await fetch("https://nymph.vahin.dev/api/services", {
        cache: "no-store",
    });

    if (!req.ok) {
        throw new Error(`${req.status}: ${req.statusText}`);
    }

    const data = await req.json() as ServicesResponse;

    return Object.values(data)
        .map(({ Name, Online, FetchedAt }) => ({
            name: Name,
            online: Online,
            fetchedAt: FetchedAt,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export type HistoryOutage = {
    start: string;
    end: string;
    duration_ms: number;
};

export type ServiceUptimeDay = {
    date: string;
    percentage: number | null;
    top_outages: HistoryOutage[] | null;
};

export type ServiceUptime = {
    service: string;
    days: ServiceUptimeDay[];
};

export async function getServiceHistory(days: number): Promise<ServiceUptime[] | null> {
    try {
        const params = new URLSearchParams();
        params.set("days", String(days));

        const req = await fetch(
            `https://nymph.vahin.dev/api/services/history?${params}`,
            { cache: "no-store" },
        );

        if (!req.ok) {
            return null;
        }

        const data = await req.json() as ServiceUptime[];

        return data
            .map((entry) => ({
                service: entry.service,
                days: [...entry.days].sort((a, b) => a.date.localeCompare(b.date)),
            }))
            .sort((a, b) => a.service.localeCompare(b.service));
    } catch {
        return null;
    }
}