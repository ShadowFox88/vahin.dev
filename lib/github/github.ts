import { Repository, LargeCommit } from "./types";
import { GITHUB_API_VERSION, GITHUB_TOKEN, USER_AGENT } from "@/utils/contants";

const BASE_URL = "https://api.github.com";

const QUERY = `
query($username: String!) {
    user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
                ... on Repository {
                    id
                    name
                    owner {
                        login
                    } 
                }
            }
        }
    }
}
`;

export async function getRepository(
    owner: string,
    repo: string
): Promise<Repository> {
    const req = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
        headers: {
            "User-Agent": USER_AGENT,
            "X-GitHub-Api-Version": GITHUB_API_VERSION,
            Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        next: {
            revalidate: 60 * 60 * 24 // revalidate every day
        },
    });

    if (!req.ok) {
        throw new Error(`${req.status}: ${req.statusText}`);
    }

    return req.json();
}

export async function getPinnedRepositories(
    username: string
): Promise<Repository[]> {
    const req = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "User-Agent": USER_AGENT,
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                username,
            },
        }),
        next: {
            revalidate: 60 * 60 * 1 // revalidate every hour
        },
    });

    if (!req.ok) {
        throw new Error(`${req.status}: ${req.statusText}`);
    }

    const json = await req.json();

    if (!json.data?.user?.pinnedItems?.nodes) {
        return [];
    }

    const repos = [];

    for (const repo of json.data.user.pinnedItems.nodes) {
        repos.push(await getRepository(repo.owner.login, repo.name))
    }; // double fetch because i hate graphql and i made my type for the REST api and i don't wanna do it again

    return repos
}

export async function getTop5Commits(repo: Repository): Promise<LargeCommit[]> {
    const req = await fetch(repo.commits_url.replace("{/sha}", ""), {
        headers: {
            "User-Agent": USER_AGENT,
            "X-GitHub-Api-Version": GITHUB_API_VERSION,
            Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        next: {
            revalidate: 60 * 60 * 24 // revalidate every day
        },
    });

    if (!req.ok) {
        throw new Error(`${req.status}: ${req.statusText}`);
    }

    const commits = await req.json()

    return commits.slice(0, 5);
}