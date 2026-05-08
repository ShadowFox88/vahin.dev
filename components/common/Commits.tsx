import { getRepository, getTop5Commits } from "@/lib/github/github"

interface CommitsProps {
    username: string
    repo: string
}

export default async function Commits({ username, repo }: CommitsProps) {
    const repository = await getRepository(username, repo)
    const last5Commits = await getTop5Commits(repository)

    return (
        <ul>
            {last5Commits.map((commit) => 
                <li key={`${commit.sha}`} className="flex gap-5">
                    <a href={commit.html_url}>
                        <p className="text-amber-400/80 uppercase tracking-widest text-sm transition-all duration-200 hover:scale-105 hover:animate-pulse underline underline-offset-4">{commit.sha.slice(0, 8)}</p>
                    </a>
                    <p className="text-sm text-amber-600/40">{new Date(Date.parse(commit.commit.author.date)).toISOString().split('T')[0]}</p>
                    <p className="text-xs truncate ">{commit.commit.message.split("\n")[0]}</p>
                </li>
            )}
        </ul>
    )
}