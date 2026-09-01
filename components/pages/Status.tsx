"use client"

import { useCallback, useEffect, useRef, useState } from "react";

import Section from "../common/Section";

import { getServices, getServiceHistory, HistoryOutage, ServiceStatus, ServiceUptime, ServiceUptimeDay } from "@/lib/status";

const REFRESH_MS = 60_000;

const UPTIME_TIERS: { min: number; color: string; text: string; label: string }[] = [
    { min: 99.0, color: "bg-emerald-600/70", text: "text-emerald-400", label: "up" },
    { min: 97.0, color: "bg-lime-600/60", text: "text-lime-400", label: "healthy" },
    { min: 90.0, color: "bg-amber-600/60", text: "text-amber-400", label: "minor" },
    { min: 0.0, color: "bg-red-700/60", text: "text-red-400", label: "major" },
];

function formatClock(date: Date): string {
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function percentTier(percent: number | null): (typeof UPTIME_TIERS)[number] | null {
    if (percent === null) return null;
    const pct = percent / 100;
    for (const tier of UPTIME_TIERS) {
        if (pct >= tier.min) return tier;
    }
    return UPTIME_TIERS[UPTIME_TIERS.length - 1];
}

function cellColor(percent: number | null): string {
    return percentTier(percent)?.color ?? "bg-neutral-800/60";
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <span className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-[1px] ${color}`} />
            <span className="text-amber-600/50 text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </span>
    );
}

function Banner({ services, countdown, lastRefresh, onRefresh }: { services: ServiceStatus[]; countdown: number; lastRefresh: number; onRefresh: () => void }) {
    const total = services.length;
    const online = services.filter((service) => service.online).length;
    const allUp = online === total;
    const noneUp = online === 0;

    const heading = allUp ? "all systems operational" : noneUp ? "all services down" : "partial outage";
    const headingColor = allUp ? "text-emerald-400/80" : noneUp ? "text-red-500/80" : "text-amber-400/80";
    const dotColor = allUp ? "bg-emerald-500" : noneUp ? "bg-red-600" : "bg-amber-500";
    const dotColorSoft = allUp ? "bg-emerald-500/60" : noneUp ? "bg-red-600/60" : "bg-amber-500/60";

    return (
        <div className="relative border-amber-600/20 border-2 p-5 mb-5 flex rounded-sm items-center gap-5">
            <span className="relative flex h-3 w-3 shrink-0 z-10">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`} />
                <span className={`relative inline-flex rounded-full h-3 w-3 ${dotColorSoft}`} />
            </span>
            <div className="min-w-0 pr-12">
                <p className={`text-2xl ${headingColor}`}>{heading}</p>
                <p className="leading-relaxed text-amber-600/40">
                    <span className="text-amber-400 font-bold">{online}/{total}</span> services online · last checked <span className="text-amber-400 font-bold">{formatClock(new Date(lastRefresh))}</span>
                </p>
            </div>
            <span
                onClick={onRefresh}
                className="absolute bottom-2 right-3 font-bold text-amber-400/80 text-lg tabular-nums cursor-pointer hover:text-amber-300 transition-colors"
                role="button"
            >
                {Math.ceil(countdown / 1000)}
            </span>
        </div>
    );
}

function ServiceGrid({ services }: { services: ServiceStatus[] }) {
    return (
        <div className="pt-2 pb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
            {services.map((service) =>
                <div
                    key={service.name + "_card"}
                    className="font-mono border rounded-sm border-amber-600/20 p-2 flex gap-3 items-center"
                >
                    <div className="gap-0.5 min-w-0 flex-1">
                        <p className="flex justify-between items-center gap-2">
                            <span className="text-amber-600/40 text-[10px] font-bold uppercase tracking-wider">
                                {"// service"}
                            </span>
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider tabular-nums shrink-0">
                                {formatClock(new Date(service.fetchedAt))}
                            </span>
                        </p>
                        <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate">
                            {service.name}
                        </p>
                        <p className="w-full h-full flex justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="relative flex h-2.5 w-2.5 z-10">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${service.online ? 'bg-emerald-500' : 'bg-red-800'}`} />
                                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${service.online ? 'bg-emerald-500/60' : 'bg-red-800/60'}`} />
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${service.online ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {service.online ? 'online' : 'offline'}
                                </span>
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function overallUptime(entry: ServiceUptime): number | null {
    const days = entry.days.filter((day) => day.percentage !== null);
    if (days.length === 0) return null;
    return days.reduce((sum, day) => sum + (day.percentage as number) / 100, 0) / days.length;
}

function outageCount(entry: ServiceUptime | undefined): number {
    if (!entry) return 0;
    const days = entry.days;
    if (days.every((day) => day.outage_count !== undefined)) {
        return days.reduce((sum, day) => sum + (day.outage_count ?? 0), 0);
    }
    return days.filter((day) => day.percentage !== null && day.percentage < 100).length;
}

function formatDuration(ms: number): string {
    const hours = Math.floor(ms / 3_600_000);
    const mins = Math.floor((ms % 3_600_000) / 60_000);
    if (hours === 0) return `${mins} min`;
    return `${hours} hr${hours !== 1 ? "s" : ""} ${mins} min`;
}

function formatTimeShort(rfc3339: string): string {
    return new Date(rfc3339).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" }).toLowerCase();
}

function UptimeHistory({ services, history }: { services: ServiceStatus[] | null; history: ServiceUptime[] | null }) {
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        date: string;
        percent: number | null;
        outages: HistoryOutage[] | null;
        outageCount: number | null;
        outageTotalDuration: number | null;
        serviceName: string;
    } | null>(null);

    if (!services || services.length === 0) {
        return (
            <p className="pt-2 pb-8 text-amber-600/40 text-xs uppercase tracking-widest">
                {"// no services available"}
            </p>
        );
    }

    if (!history) {
        return (
            <p className="pt-2 pb-8 text-amber-600/40 text-xs uppercase tracking-widest">
                {"// history unavailable"}
            </p>
        );
    }

    if (history.length === 0) {
        return (
            <p className="pt-2 pb-8 text-amber-600/40 text-xs uppercase tracking-widest">
                {"// no uptime data reported"}
            </p>
        );
    }

    const historyMap = new Map(history.map((entry) => [entry.service, entry]));
    const firstEntry = history.find((entry) => entry.days.length > 0);
    const firstDay = firstEntry?.days[0]?.date;
    const lastDay = firstEntry?.days[firstEntry.days.length - 1]?.date;

    const handleEnter = (e: React.MouseEvent<HTMLSpanElement>, day: ServiceUptimeDay, serviceName: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            x: rect.left + rect.width / 2,
            y: rect.top,
            date: day.date,
            percent: day.percentage,
            outages: day.top_outages,
            outageCount: day.outage_count ?? null,
            outageTotalDuration: day.outage_total_duration ?? null,
            serviceName,
        });
    };

    const handleLeave = () => setTooltip(null);

    return (
        <div className="pt-2 pb-8 flex flex-col w-full gap-2.5">
            {firstDay && lastDay && (
                <div className="flex items-center">
                    <span className="w-28 shrink-0" />
                    <div className="flex-1 flex justify-between px-0.5">
                        <span className="text-amber-600/50 text-[10px] font-bold uppercase tracking-wider">
                            {new Date(firstDay).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}
                        </span>
                        <span className="text-amber-600/50 text-[10px] font-bold uppercase tracking-wider">
                            {new Date(lastDay).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}
                        </span>
                    </div>
                    <span className="w-16 shrink-0" />
                </div>
            )}

            {services.map((service) => {
                const entry = historyMap.get(service.name);

                return (
                    <div
                        key={service.name + "_history"}
                        className="flex items-center gap-3 group"
                    >
                        <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate w-28 shrink-0 group-hover:text-amber-300/80 transition-colors">
                            {service.name}
                        </p>
                        <div className="flex flex-1 min-w-0">
                            {(entry?.days ?? []).map((day) =>
                                <span
                                    key={day.date}
                                    onMouseEnter={(e) => handleEnter(e, day, service.name)}
                                    onMouseLeave={handleLeave}
                                    className={`flex-1 h-7 shrink-0 rounded-[1px] cursor-default transition-all hover:opacity-80 hover:-translate-y-1.5 ${cellColor(day.percentage)}`}
                                />
                            )}
                        </div>
                        <p className="ml-auto shrink-0 w-20 text-right text-amber-400 text-[10px] font-bold tabular-nums leading-tight">
                            {entry ? `${overallUptime(entry)?.toFixed(1) ?? "--"}%` : "--"}
                            {entry && (
                                <span className="block text-amber-600/50 text-[9px]">
                                    {outageCount(entry)} total outage{outageCount(entry) !== 1 ? "s" : ""}
                                </span>
                            )}
                        </p>
                    </div>
                );
            })}

            <div className="flex items-center gap-3 pt-1">
                <LegendItem color="bg-emerald-600/70" label="up" />
                <LegendItem color="bg-lime-600/60" label="healthy" />
                <LegendItem color="bg-amber-600/60" label="minor" />
                <LegendItem color="bg-red-700/60" label="major" />
                <LegendItem color="bg-neutral-800/60" label="no data" />
            </div>

            {tooltip && (
                <div
                    className="fixed z-50 pointer-events-none transition-opacity duration-100"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 14,
                        transform: "translate(-50%, -100%)",
                    }}
                >
                    <div className="bg-black border border-amber-600/40 rounded-sm px-3 py-2 font-mono shadow-lg shadow-black/50">
                        <p className="text-sky-400 text-[10px] font-bold uppercase tracking-wider">
                            {tooltip.serviceName}
                        </p>
                        <p className="text-fuchsia-400 text-[10px] font-bold tracking-wider mt-0.5">
                            {new Date(tooltip.date).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                        <p className={`text-[10px] font-bold tracking-wider mt-0.5 ${percentTier(tooltip.percent)?.text ?? "text-neutral-400"}`}>
                            {tooltip.percent === null ? "no data" : `${(tooltip.percent / 100).toFixed(1)}% uptime`}
                            {tooltip.outageTotalDuration !== null && tooltip.outageTotalDuration > 0 && (
                                <span className="text-amber-600/40">
                                    {" "}· {formatDuration(tooltip.outageTotalDuration)} downtime
                                </span>
                            )}
                        </p>
                        {tooltip.outages && tooltip.outages.length > 0 && (
                            <>
                                <p className="text-amber-600/40 text-[10px] font-bold uppercase tracking-wider mt-2">
                                    {"// top outages"}
                                </p>
                                {tooltip.outages.slice(0, 3).map((outage, i) => (
                                    <p key={`${outage.start}_${i}`} className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-red-400 text-[10px] font-bold tabular-nums">
                                            {formatTimeShort(outage.start)}
                                        </span>
                                        <span className="text-amber-600/40 text-[10px] font-bold">-</span>
                                        <span className="text-amber-400 text-[10px] font-bold tabular-nums">
                                            {formatTimeShort(outage.end)}
                                        </span>
                                        <span className="text-amber-600/40 text-[10px] font-bold">
                                            ({formatDuration(outage.duration_ms)})
                                        </span>
                                    </p>
                                ))}
                                {(() => {
                                    const shown = tooltip.outages.slice(0, 3);
                                    const shownDur = shown.reduce((sum, o) => sum + o.duration_ms, 0);
                                    const remaining = Math.max(0, (tooltip.outageCount ?? shown.length) - shown.length);
                                    const remainingDur = Math.max(0, (tooltip.outageTotalDuration ?? 0) - shownDur);
                                    if (remaining > 0 || remainingDur > 0) {
                                        return (
                                            <p className="text-amber-600/40 text-[10px] font-bold tracking-wider mt-0.5">
                                                +{remaining} more · {formatDuration(remainingDur)} remaining
                                            </p>
                                        );
                                    }
                                    return null;
                                })()}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export function Status() {
    const [services, setServices] = useState<ServiceStatus[] | null>(null);
    const [history, setHistory] = useState<ServiceUptime[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(REFRESH_MS);
    const [lastRefresh, setLastRefresh] = useState(0);
    const lastRefreshRef = useRef(0);

    const refresh = useCallback(async () => {
        const [svc, hist] = await Promise.all([
            getServices(),
            getServiceHistory(90),
        ]);
        setServices(svc);
        setHistory(hist);
        setError(null);
        setLastRefresh(Date.now());
    }, []);

    const handleRefresh = useCallback(() => {
        refresh().catch((e) => setError(e instanceof Error ? e.message : String(e)));
        setCountdown(REFRESH_MS);
        lastRefreshRef.current = Date.now();
    }, [refresh]);

    useEffect(() => {
        lastRefreshRef.current = Date.now();

        const fetchStatus = () => {
            refresh().catch((e) => setError(e instanceof Error ? e.message : String(e)));
            lastRefreshRef.current = Date.now();
        };

        const initial = setTimeout(fetchStatus, 0);
        const timer = setInterval(() => {
            const elapsed = Date.now() - lastRefreshRef.current;
            setCountdown(Math.max(0, REFRESH_MS - elapsed));

            if (elapsed >= REFRESH_MS) {
                fetchStatus();
            }
        }, 1000);

        return () => {
            clearTimeout(initial);
            clearInterval(timer);
        };
    }, [refresh]);

    return (
        <div>
            <Section index="01" label="services" heading="system status">
                {error && services === null ? (
                    <div className="border-amber-600/20 border-2 p-5 mb-5 flex rounded-sm">
                        <div>
                            <p className="text-red-500/80 text-xl">nymph unreachable</p>
                            <p className="leading-relaxed text-amber-600/40">
                                could not fetch live service status: {error}
                            </p>
                        </div>
                    </div>
                ) : services === null ? (
                    <div className="border-amber-600/20 border-2 p-5 mb-5 flex rounded-sm">
                        <p className="leading-relaxed text-amber-600/40">
                            {"// fetching live status..."}
                        </p>
                    </div>
                ) : services.length > 0 ? (
                    <>
                        <Banner services={services} countdown={countdown} lastRefresh={lastRefresh} onRefresh={handleRefresh} />
                        <ServiceGrid services={services} />
                    </>
                ) : (
                    <div className="border-amber-600/20 border-2 p-5 mb-5 flex rounded-sm">
                        <p className="leading-relaxed text-amber-600/40">
                            no services reported by nymph
                        </p>
                    </div>
                )}
            </Section>

            <Section index="02" label="uptime" heading="historical uptime">
                <UptimeHistory services={services} history={history} />
            </Section>
        </div>
    );
}