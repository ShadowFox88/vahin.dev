import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { CALENDAR_SVG, PAGE_SVG, POP_OUT_SVG } from '@/utils/elements';

interface BlogPostsProps {
    number?: number;
}

export default function BlogPosts({ number }: BlogPostsProps) {
    const blogDir = path.join(process.cwd(), 'public', 'blog_posts');
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    
    let posts = files.map(file => {
        const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
        const { data, content } = matter(raw);
        const [titleLine, description] = content.split('\n');
        const readTime = Math.ceil(content.split(/\s+/).length / 200); // assume the average person reads 200wpm
        // according to wikipedia - 08/05/26: https://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension (it says average wpm is 184±29 wpm)
        return {
            filename: file.replace('.md', ''),
            title: data.title ?? titleLine.replace(/^#+ /, ''),
            description: data.description ?? description?.trim(),
            created: data.created ? new Date(data.created) : new Date(0),
            updated: data.updated ? new Date(data.updated) : new Date(0),
            readTime
        };
    });
    const fmt = (d: Date) => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(d);

    posts.sort((a, b) => b.created.getTime() - a.created.getTime()) // sorts posts in desc order

    if (typeof(number) === "number") {
        posts = posts.slice(0, number)
    }

    return (
        <div className="pt-2 pb-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {posts.map((post) =>
                <a
                    key={`${[post.filename]}_blog_entry`}
                    href={`/blog/${post.filename}`}
                    className="rounded-sm relative group flex-1 font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center group"
                >
                    <div className="w-full">
                        <div className="flex items-center justify-between mt-auto">
                            <p className="text-amber-600/40 text-[10px] uppercase tracking-widest">// blog post</p>
                            {POP_OUT_SVG}
                        </div>
                        <p className="text-amber-400/80 text-sm tracking-wider uppercase truncate">{post.title}</p>
                        <p className="text-xs flex items-center gap-3">{CALENDAR_SVG} {`${fmt(post.created)}`} {PAGE_SVG} {post.readTime} min read</p>
                        <p className="text-xs min-h-[2lh] text-amber-600/40 line-clamp-2">{post.description}</p>
                    </div>
                </a>
            )}
        </div>
    );
}