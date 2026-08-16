type Repository = {
    CreatedAt: string;
    Description: string;
    Forks: number;
    ID: string;
    Name: string;
    Owner: Owner;
    IsArchived: boolean;
    IsFork: boolean;
    License: License | null;
    Languages: Language[];
    StargazerCount: number;
    URL: string;
}

type Owner = {
    Name: string;
    URL: string;
}

type License = {
    Name: string;
    Nickname: string;
    Key: string;
}

export type Language = {
    Name: string;
    Colour: string;
    Size: number;
    Percentage: number;
}

export type Response = {
    Repositories: Repository[];
    PinnedRepositories: Repository[];
    TotalCount: number;
    HasNextPage: boolean;
    EndCursor: string;
    Date: string;
}

export type GitHubCommit = {
    sha: string;
    html_url: string;
    commit: {
        author: {
            date: string;
        };
        message: string;
    };
}
