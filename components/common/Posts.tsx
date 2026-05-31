import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { CALENDAR_SVG, PAGE_SVG, POP_OUT_SVG } from '@/utils/elements';

import Section from './Section';

interface PostsProps {
    type: 'blog' | 'notes'
    subject?: string
    number?: number
}

type Post = {
    href: string;
    label: string;
    subject: string;
    title: string;
    description: string;
    created: Date;
    readTime: number;
    subsection?: string;
}

const fmt = (d: Date) => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(d);

function Card({ post }: { post: Post }) {
    return (
        <a
            href={post.href}
            className="rounded-sm relative group flex-1 font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center"
        >
            <div className="w-full">
                <div className="flex items-center justify-between mt-auto">
                    <p className="text-amber-600/40 text-[10px] uppercase tracking-widest">{post.label.replace(/-/g, " ")}</p>
                    {POP_OUT_SVG}
                </div>
                <p className="text-amber-400/80 text-sm tracking-wider uppercase truncate">{post.title}</p>
                <p className="text-xs flex items-center gap-3">{CALENDAR_SVG} {fmt(post.created)} {PAGE_SVG} {post.readTime} min read</p>
                <p className="text-xs min-h-[2lh] text-amber-600/40 line-clamp-2">{post.description}</p>
            </div>
        </a>
    );
}

function readPost(filePath: string, href: string, label: string, subject: string): Post {
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
        readTime: Math.ceil(content.split(/\s+/).length / 200),
        subsection: data.subsection,
    };
}

function NoteGrid({ posts, showViewAll, subj }: { posts: Post[], showViewAll?: boolean, subj: string }) {
    return (
        <>
            {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32,8 L56,52 Q57,54 55,54 L9,54 Q7,54 8,52 Z" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                        <line x1="32" y1="24" x2="32" y2="38" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="32" cy="46" r="2" fill="#ef4444" />
                    </svg>
                    <p className="text-amber-600/40 text-xs uppercase tracking-widest">// no notes yet</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
                        {posts.map(post => <Card key={post.href} post={post} />)}
                    </div>
                    {showViewAll && (
                        <a href={`/notes/${subj}`} className="text-amber-600/40 hover:text-amber-500/60 text-[10px] uppercase tracking-widest transition-all duration-200 pb-8 inline-block">
                            // view all →
                        </a>
                    )}
                </>
            )}
        </>
    );
}

export default function Posts({ type, subject, number }: PostsProps) {
    const base = path.join(process.cwd(), 'public', type === 'blog' ? 'blog_posts' : 'notes');

    if (!fs.existsSync(base)) return <div />;

    if (type === 'blog') {
        let posts = fs.readdirSync(base)
            .filter(f => f.endsWith('.md'))
            .map(file => readPost(path.join(base, file), `/blog/${file.replace('.md', '')}`, '// blog post', 'blog'));

        posts.sort((a, b) => b.created.getTime() - a.created.getTime());
        if (typeof number === 'number') posts = posts.slice(0, number);

        return (
            <div className="pt-2 pb-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {posts.map(post => <Card key={post.href} post={post} />)}
            </div>
        );
    }

    const subjects = subject
        ? [subject]
        : fs.existsSync(base)
            ? fs.readdirSync(base).filter(f => fs.statSync(path.join(base, f)).isDirectory()).sort()
            : [];

    const groups = subjects.map((subj, i) => {
        let posts = fs.readdirSync(path.join(base, subj))
            .filter(f => f.endsWith('.md'))
            .map(file => readPost(
                path.join(base, subj, file),
                `/notes/${subj}/${file.replace('.md', '')}`,
                `// ${subj}`,
                subj
            ))
            .sort((a, b) => b.created.getTime() - a.created.getTime());

        if (typeof number === 'number') posts = posts.slice(0, number);

        return { subj, posts, index: String(i + 1).padStart(2, '0') };
    });


    if (subject) {
        const { posts } = groups[0];
        const unsectioned = posts.filter(p => !p.subsection);
        const subsections = [...new Set(posts.filter(p => p.subsection).map(p => p.subsection!))]
            .sort();

        return (
            <div className="pt-2 pb-8 flex flex-col w-full">
                {unsectioned.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-8">
                        {unsectioned.map(post => <Card key={post.href} post={post} />)}
                    </div>
                )}
                {subsections.map((sub, i) => {
                    const subPosts = posts.filter(p => p.subsection === sub);
                    return (
                        <Section key={sub} index={String(i + 1).padStart(2, '0')} label={sub.replace(/-/g, ' ')} heading={sub.replace(/-/g, ' ')}>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-8">
                                {subPosts.map(post => <Card key={post.href} post={post} />)}
                            </div>
                        </Section>
                    );
                })}
            </div>
        );
    }


    return (
        <div className="pt-2 pb-8 flex flex-col w-full">
            {groups.map(({ subj, posts, index }) => (
                <Section key={subj} index={index} label={subj.replace(/-/g, ' ')} heading={subj.replace(/-/g, ' ')}>
                    <NoteGrid posts={posts} showViewAll={number ? true : false} subj={subj} />
                </Section>
            ))}
        </div>
    );
}