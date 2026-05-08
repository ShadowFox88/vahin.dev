type Owner = {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
    user_view_type: "public";
}

type License = {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
}


export type Repository = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: Owner;
    html_url: string;
    description: string;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    homepage: string;
    size: string;
    stargazers_count: number;
    watchers_count: number;
    language?: string;
    forks_count: number;
    archived: boolean;
    commits_url: string;
}

export type CommitUser = {
    name: string;
    email: string;
    date: string;
}

export type CommitVerification = {
    verified: boolean;
    reason: string;
    verified_at: string;
    // we don't care about signature or payload tbh - let github handle it
}

export type Commit = {
    author: CommitUser;
    committer: CommitUser;
    message: string;
}

export type LargeCommit = {
    sha: string;
    commit: Commit;
    html_url: string;
}