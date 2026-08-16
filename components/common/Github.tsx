import { getGithubResponse, getLast5Commits, Language } from "@/lib/github"

import { STAR_SVG, FORK_SVG, POP_OUT_SVG } from "@/utils/elements"

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
    const { PinnedRepositories } = await getGithubResponse();

    return (
        <div className="grid-cols-2 gap-3 grid">
            {PinnedRepositories.map((repo) => {
                const mainLanguage = getMainLanguage(repo.Languages);

                return (
                    <a key={`${username}_${repo.Name}`} href={repo.URL}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`relative flex-1 min-w-0 font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center group`}
                    >
                        <div className="w-full">
                            <div className="items-center justify-between flex">
                                <p className="text-amber-600/40 text-[10px] uppercase tracking-widest truncate min-w-0">
                                    // {repo.Name}
                                </p>
                                {POP_OUT_SVG}
                            </div>
                            <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate flex items-center gap-1">
                            </p>
                            <p className="text-xs min-h-[2lh] text-amber-600/40 line-clamp-2">
                                {repo.Description || "No description provided"}
                            </p>
                            <div className="flex items-center gap-3">
                                <p className="flex items-center gap-1">
                                    {STAR_SVG}{repo.StargazerCount}
                                </p>
                                <p className="flex items-center gap-1">
                                    {FORK_SVG}{repo.Forks}
                                </p>
                                <p className="uppercase monospace text-[10px] flex items-center gap-1.5">
                                    <span
                                            className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: mainLanguage?.Colour ?? "#374151" }}/>
                                    {mainLanguage?.Name ?? "no language"} 
                                </p>
                                <div className="ml-auto flex items-center gap-2">
                                    {repo.IsFork && (
                                        <span className={`text-[9px] uppercase tracking-widest ${repo.IsArchived ? "text-purple-300/40" : "text-purple-300"}`}>
                                            Forked
                                        </span>
                                    )}
                                    {repo.IsArchived && (
                                        <span className="text-[9px] uppercase tracking-widest text-gray-500/50">
                                            Archived
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

export async function Commits({ username, repo }: CommitsProps) {
    const last5Commits = await getLast5Commits(username, repo)

    return (
        <ul>
            {last5Commits.map((c) =>
                <li key={c.sha} className="flex gap-3 items-center">
                    <a href={c.html_url}>
                        <p className="text-amber-400/80 uppercase tracking-widest text-sm transition-all duration-200 hover:scale-105 hover:animate-pulse underline underline-offset-4">{c.sha.slice(0, 8)}</p>
                    </a>
                    <p className="text-xs text-amber-600/40">{new Date(Date.parse(c.commit.author.date)).toISOString().split('T')[0]}</p>
                    <p className="text-xs truncate ">{c.commit.message.split("\n")[0]}</p>
                </li>
            )}
        </ul>
    )
}

function getMainLanguage(languages?: Language[]) {
    if (!languages || languages.length === 0) return null;
    return languages.reduce((biggest, current) =>
        current.Size > biggest.Size ? current : biggest
    );
}

export async function Repositories({ username }: RepositoryProps) {
    const { Repositories } = await getGithubResponse();

    Repositories[0].IsArchived = true;
    Repositories[0].IsFork = true;

    return (
        <div className="grid-cols-3 gap-3 grid">
            {Repositories.map((repo) => {
                const mainLanguage = getMainLanguage(repo.Languages);

                return (
                    <a key={`${username}_${repo.Name}`} href={repo.URL}
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`relative flex-1 min-w-0 font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center group`}
                    >
                        <div className="w-full">
                            <div className="items-center justify-between flex">
                                <p className="text-amber-600/40 text-[10px] uppercase tracking-widest truncate min-w-0">
                                    // {repo.Name}
                                </p>
                                {POP_OUT_SVG}
                            </div>
                            <p className="text-amber-400/80 text-xs tracking-wider uppercase truncate flex items-center gap-1">
                            </p>
                            <p className="text-xs min-h-[2lh] text-amber-600/40 line-clamp-2">
                                {repo.Description || "No description provided"}
                            </p>
                            <div className="flex items-center gap-3">
                                <p className="flex items-center gap-1">
                                    {STAR_SVG}{repo.StargazerCount}
                                </p>
                                <p className="flex items-center gap-1">
                                    {FORK_SVG}{repo.Forks}
                                </p>
                                <p className="uppercase monospace text-[10px] flex items-center gap-1.5">
                                    <span
                                            className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: mainLanguage?.Colour ?? "#374151" }}/>
                                    {mainLanguage?.Name ?? "no language"} 
                                </p>
                                <div className="ml-auto flex items-center gap-2">
                                    {repo.IsFork && (
                                        <span className={`text-[9px] uppercase tracking-widest ${repo.IsArchived ? "text-purple-300/40" : "text-purple-300"}`}>
                                            Forked
                                        </span>
                                    )}
                                    {repo.IsArchived && (
                                        <span className="text-[9px] uppercase tracking-widest text-gray-500/50">
                                            Archived
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}