import { GitHubCommit, Response } from "./types";

const MICROSERVICE_URL = "https://nymph.vahin.dev/api/github";
const GITHUB_API_URL = "https://api.github.com/repos";

export async function getGithubResponse(): Promise<Response> {
    const req = await fetch(MICROSERVICE_URL, {
        next: {
            revalidate: 60 * 60 * 0.5, // revalidate every 30 mins
        },
    });

    if (!req.ok) {
        throw new Error(`${req.status}: ${req.statusText}`);
    }

    return req.json();
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getLast5Commits(owner: string, repo: string): Promise<GitHubCommit[]> {
    const url = `${GITHUB_API_URL}/${owner}/${repo}/commits?per_page=5`;

    while (true) {
        const req = await fetch(url, {
            cache: "force-cache", // fetch once at build time, cache forever
        });

        if (req.ok) {
            return req.json();
        }

        if (req.status === 403 || req.status === 429) {
            const reset = req.headers.get("X-RateLimit-Reset");
            const retryAfter = req.headers.get("Retry-After");

            if (reset) {
                const waitMs = Number(reset) * 1000 - Date.now() + 1000;
                if (waitMs > 0) {
                    await wait(waitMs);
                    continue;
                }
            }

            if (retryAfter) {
                await wait(Number(retryAfter) * 1000);
                continue;
            }
        }

        throw new Error(`${req.status}: ${req.statusText}`);
    }
}