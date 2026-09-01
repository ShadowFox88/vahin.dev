import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'public');

export type Post = {
    href: string;
    label: string;
    subject: string;
    title: string;
    description: string;
    created: Date;
    readTime: number;
    subsection?: string;
};

export type NoteGroup = {
    subj: string;
    index: string;
    posts: Post[];
};

export function formatDate(d: Date): string {
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(d);
}

export function calcReadTime(content: string): number {
    return Math.ceil(content.split(/\s+/).length / 200);
}

export function readPostFile(filePath: string, href: string, label: string, subject: string): Post {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const [titleLine, description] = content.split('\n');
    return {
        href,
        label,
        subject,
        title: data.title ?? titleLine.replace(/^#+ /, ''),
        description: data.description ?? description?.trim(),
        created: data.created ? new Date(data.created) : new Date(0),
        readTime: calcReadTime(content),
        subsection: data.subsection,
    };
}

function sortNewest(posts: Post[]): Post[] {
    return posts.sort((a, b) => b.created.getTime() - a.created.getTime());
}

function limit(posts: Post[], number?: number): Post[] {
    return typeof number === 'number' ? posts.slice(0, number) : posts;
}

export function getBlogPosts(number?: number): Post[] {
    const base = path.join(CONTENT_DIR, 'blog_posts');
    if (!fs.existsSync(base)) return [];

    return limit(sortNewest(
        fs.readdirSync(base)
            .filter(f => f.endsWith('.md'))
            .map(file => readPostFile(
                path.join(base, file),
                `/blog/${file.replace('.md', '')}`,
                '// blog post',
                'blog'
            ))
    ), number);
}

export function getNotesSubjects(): string[] {
    const base = path.join(CONTENT_DIR, 'notes');
    if (!fs.existsSync(base)) return [];
    return fs.readdirSync(base)
        .filter(f => fs.statSync(path.join(base, f)).isDirectory())
        .sort();
}

export function getNotesGroups(subject?: string, number?: number): NoteGroup[] {
    const subjects = subject ? [subject] : getNotesSubjects();
    const base = path.join(CONTENT_DIR, 'notes');

    return subjects.map((subj, i) => {
        const posts = limit(sortNewest(
            fs.readdirSync(path.join(base, subj))
                .filter(f => f.endsWith('.md'))
                .map(file => readPostFile(
                    path.join(base, subj, file),
                    `/notes/${subj}/${file.replace('.md', '')}`,
                    `// ${subj}`,
                    subj
                ))
        ), number);

        return { subj, posts, index: String(i + 1).padStart(2, '0') };
    });
}
