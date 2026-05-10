import { SERVICES } from "@/utils/contants"

import { isOnline } from "@/lib/status/status"

export default async function Services() {

    const results = await Promise.all(SERVICES.map(async (service) => ({
        service,
        online: await isOnline(service)
    })));

    return (
        <div className="pt-2 pb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-4xl">
            {results.map(({ service, online }) =>
                <a
                    href={service.url}
                    key={service.name + "_card"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono border rounded-sm relative border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse p-2 flex gap-3 items-center group"
                >
                    {service.tailscale && <div className="absolute rounded-sm -top-2 -right-2 bg-black border border-amber-600/60 text-amber-600/80 text-[8px] uppercase tracking-widest px-1.5 py-0.5">
                        tailscale
                    </div>}
                    <div className="w-10 h-10 overflow-hidden shrink-0 flex">
                        {service.icon}
                    </div>
                    <div className="gap-0.5 w-full">
                        <p className="text-amber-600/40 text-[10px] uppercase tracking-widest flex gap-1">
                            // service
                        </p>
                        <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate">
                            {service.name}
                        </p>
                        <p className="w-full h-full flex justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2 z-10">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 z-5 ${online ? 'bg-emerald-500' : 'bg-red-800'}`} />
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${online ? 'bg-emerald-500/60' : 'bg-red-800/60'}`} />
                                </span>
                                <span className={`text-[8px] uppercase tracking-widest ${online ? 'text-emerald-600/40' : 'text-red-900/60'}`}>
                                    {online ? 'online' : 'offline'}
                                </span>
                            </span>
                        </p>
                    </div>
                    <p className="ml-auto text-amber-600/30 group-hover:text-amber-500/60 text-xs transition-all duration-200 self-center">
                        →
                    </p>
                </a>
            )}
        </div>
    );
}