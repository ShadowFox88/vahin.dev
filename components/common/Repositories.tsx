import { getRepositories } from "@/lib/github/github";

interface ProjectProps {
    username: string
}

const STAR_SVG = (
    <svg width=".75rem" height=".75rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-amber-500">
        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
    </svg>)
const WATCH_SVG = (
    <svg width=".75rem" height=".75rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-amber-600/60">
        <path d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#1C274C"></path> <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z" />
    </svg>
)
const FORK_SVG = (
    <svg width=".75rem" height=".75rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="fill-amber-500/60">
        <path d="M2.016 26.016q0-1.92 1.088-3.456t2.912-2.176v-8.736q-1.792-0.608-2.912-2.144t-1.088-3.488q0-2.496 1.728-4.256t4.256-1.76 4.256 1.76 1.76 4.256q0 1.92-1.12 3.488t-2.88 2.144v4.736q0.992-0.384 1.984-0.384h8q0.832 0 1.408-0.576t0.608-1.408v-0.352q-1.792-0.608-2.912-2.176t-1.088-3.456q0-2.496 1.728-4.256t4.256-1.76 4.256 1.76 1.76 4.256q0 1.92-1.12 3.456t-2.88 2.176v0.352q0 2.496-1.76 4.256t-4.256 1.76h-8q-0.864 0-1.44 0.608 1.536 0.736 2.496 2.176t0.96 3.2q0 2.496-1.76 4.256t-4.256 1.76-4.256-1.76-1.728-4.256zM6.016 26.016q0 0.832 0.576 1.44t1.408 0.576 1.408-0.576 0.608-1.44-0.608-1.408-1.408-0.576-1.408 0.576-0.576 1.408zM6.016 6.016q0 0.832 0.576 1.44t1.408 0.576 1.408-0.576 0.608-1.44-0.608-1.408-1.408-0.576-1.408 0.576-0.576 1.408zM22.016 8.032q0 0.832 0.576 1.408t1.408 0.576 1.408-0.576 0.608-1.408-0.608-1.408-1.408-0.608-1.408 0.608-0.576 1.408z" />
    </svg>
)

export default async function Repositories({ username }: ProjectProps) {
    const repositories = await getRepositories(username)

    return (
        <div className="grid-cols-2 gap-3 grid">
            {repositories.map((repo) =>
                <a key={`${username}_${repo.name}`} href={repo.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="relative flex-1 min-w-0 font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center group"
                >
                    <div className=" w-full">
                        <div className="items-center justify-between flex ">
                            <p className="text-amber-600/40 text-[10px] uppercase tracking-widest">
                                // project
                            </p>
                            <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#c47a00" fillRule="evenodd" d="M5,2 C5.55228,2 6,2.44772 6,3 C6,3.55228 5.55228,4 5,4 L4,4 L4,12 L12,12 L12,11 C12,10.4477 12.4477,10 13,10 C13.5523,10 14,10.4477 14,11 L14,12 C14,13.1046 13.1046,14 12,14 L4,14 C2.89543,14 2,13.1046 2,12 L2,4 C2,2.89543 2.89543,2 4,2 L5,2 Z M15,1 L15,5.99814453 C15,6.55043453 14.5523,6.99814453 14,6.99814453 C13.4477,6.99814453 13,6.55043453 13,5.99814453 L13,4.41419 L8.71571,8.69846 C8.32519,9.08899 7.69202,9.08899 7.3015,8.69846 C6.91097,8.30794 6.91097,7.67477 7.3015,7.28425 L11.5858,3 L9.99619141,3 C9.44391141,3 8.99619141,2.55228 8.99619141,2 C8.99619141,1.44772 9.44391141,1 9.99619141,1 L15,1 Z" />
                            </svg>
                        </div>
                        <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate flex items-center gap-1">
                            {repo.name}
                            {repo.archived && (
                                <span className="text-[8px] uppercase tracking-widest border border-amber-600/50 text-amber-500/60 px-1.5 py-0.5 rounded-full">
                                    archived
                                </span>
                            )}
                            {repo.fork && (
                                <span className="absolute bottom-0 right-0 text-[8px] uppercase tracking-widest border-l border-t border-amber-600/40 text-amber-600/40 px-1.5 py-0.5">
                                    fork
                                </span>
                            )}
                        </p>
                        <p className="text-xs min-h-[2lh] text-amber-600/40 line-clamp-2">
                            {repo.description ?? "No description provided"}
                        </p>
                        <div className="flex items-center gap-3">
                            <p className="flex items-center gap-1">
                                {STAR_SVG}{repo.stargazers_count}
                            </p>
                            <p className="flex items-center gap-1">
                                {WATCH_SVG}{repo.watchers_count}
                            </p>
                            <p className="flex items-center gap-1">
                                {FORK_SVG}{repo.forks_count}
                            </p>
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
}