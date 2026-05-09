import { getRepository, getTop5Commits, getPinnedRepositories, getRepositories } from "@/lib/github/github"

import { STAR_SVG, FORK_SVG, WATCH_SVG, VERIFIED, UNVERIFIED } from "@/utils/elements"

interface PinnedRepositoryProps {
    username: string
}

interface RepositoryProps {
    username: string
}

interface CommitsProps {
    username: string
    repo: string
}

export async function PinnedRepositories({ username }: PinnedRepositoryProps) {
    const repositories = await getPinnedRepositories(username);

    return (
        <div className="grid-cols-2 gap-3 grid">
            {repositories.map((repo) =>
                <a key={`${username}_${repo.name}`} href={repo.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex-1 min-w-0 rounded-sm font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center group"
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
                        <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate">
                            {repo.name}
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

export async function Commits({ username, repo }: CommitsProps) {
    const repository = await getRepository(username, repo)
    const last5Commits = await getTop5Commits(repository)

    return (
        <ul>
            {last5Commits.map((c) =>
                <li key={`${c.sha}`} className="flex gap-3">
                    <a href={c.html_url}>
                        <p className="text-amber-400/80 uppercase tracking-widest text-sm transition-all duration-200 hover:scale-105 hover:animate-pulse underline underline-offset-4">{c.sha.slice(0, 8)}</p>
                    </a>
                    <p className="text-sm text-amber-600/40">{new Date(Date.parse(c.author.date)).toISOString().split('T')[0]}</p>
                    {c.verification.verified ? VERIFIED : UNVERIFIED}
                    <p className="text-xs truncate ">{c.message.split("\n")[0]}</p>
                </li>
            )}
        </ul>
    )
}

export async function Repositories({ username }: RepositoryProps) {
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