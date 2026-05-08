import { getRepository, getTop5Commits } from "@/lib/github/github"

interface CommitsProps {
    username: string
    repo: string
}

const VERIFIED = (<p className="inline-flex items-center gap-1 rounded-full uppercase bg-emerald-500/10 px-2 py-0.5 my-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        verified
                    </p>);
const UNVERIFIED = (<p className="inline-flex items-center gap-1 rounded-full uppercase bg-amber-500/10 px-2 py-0.5 my-0.5 text-[10px] font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        unverified
                    </p>)

export default async function Commits({ username, repo }: CommitsProps) {
    const repository = await getRepository(username, repo)
    const last5Commits = await getTop5Commits(repository)
    console.log(last5Commits)

    return (
        <ul>
            {last5Commits.map((c) =>
                <li key={`${c.sha}`} className="flex gap-3">
                    <a href={c.html_url}>
                        <p className="text-amber-400/80 uppercase tracking-widest text-sm transition-all duration-200 hover:scale-105 hover:animate-pulse underline underline-offset-4">{c.sha.slice(0, 8)}</p>
                    </a>
                    <p className="text-sm text-amber-600/40">{new Date(Date.parse(c.commit.author.date)).toISOString().split('T')[0]}</p>
                    {c.commit.verification.verified ? VERIFIED : UNVERIFIED}
                    <p className="text-xs truncate ">{c.commit.message.split("\n")[0]}</p>
                </li>
            )}
        </ul>
    )
}