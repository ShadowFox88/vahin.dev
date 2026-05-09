import fs from 'fs';
import path from 'path';

export const CALENDAR_SVG = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-amber-500">
        <path d="M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
export const PAGE_SVG = (
    <svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" className="stroke-amber-500">
        <path strokeLinejoin="round" strokeWidth="2" d="M6 5a2 2 0 012-2h16a2 2 0 012 2v22a2 2 0 01-2 2H8a2 2 0 01-2-2V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9h4M10 16h12M10 20h12M10 24h4" />
        <circle cx="22" cy="9" r="1" className="fill-amber-500" />
    </svg>
)

interface BlogPostsProps {
    number?: number;
}

export default function BlogPosts({ number }: BlogPostsProps) {
    const blogDir = path.join(process.cwd(), 'public', 'blog_posts');
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    let posts = files.map(file => {
        const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
        const [title, description] = content.split('\n');
        const stats = fs.statSync(path.join(blogDir, file));
        const readTime = Math.ceil(content.split(/\s+/).length / 200); // assume the average person reads 200wpm
        // according to wikipedia - 08/05/26: https://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension (it says average wpm is 184±29 wpm)
        return {
            filename: file.replace(".md", ""),
            title: title.replace(/^#+ /, ''),
            description: description.trim(),
            created: stats.birthtime,
            updated: stats.mtime,
            readTime
        };
    });
    const dateOptions: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    posts.sort((a, b) => b.created.getTime() - a.created.getTime()) // sorts posts in desc order

    if (typeof(number) === "number") {
        posts = posts.slice(0, number)
    }

    return (
        <div className="pt-2 pb-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-4xl">
            {posts.map((post) =>
                <a
                    key={`${[post.filename]}_blog_entry`}
                    href={`/blog/${post.filename}`}
                    className="relative group flex-1 font-mono border border-amber-600/20 hover:border-amber-500/50 hover:bg-amber-600/5 hover:shadow-[0_0_18px_rgba(245,158,11,0.35),inset_0_0_10px_rgba(245,158,11,0.08)] hover:animate-pulse transition-all duration-200 hover:scale-105 p-2 flex gap-3 items-center group"
                >
                    <div className="w-full">
                        <div className="flex items-center justify-between mt-auto">
                            <p className="text-amber-600/40 text-[10px] uppercase tracking-widest">//blog post</p>
                            <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#c47a00" fillRule="evenodd" d="M5,2 C5.55228,2 6,2.44772 6,3 C6,3.55228 5.55228,4 5,4 L4,4 L4,12 L12,12 L12,11 C12,10.4477 12.4477,10 13,10 C13.5523,10 14,10.4477 14,11 L14,12 C14,13.1046 13.1046,14 12,14 L4,14 C2.89543,14 2,13.1046 2,12 L2,4 C2,2.89543 2.89543,2 4,2 L5,2 Z M15,1 L15,5.99814453 C15,6.55043453 14.5523,6.99814453 14,6.99814453 C13.4477,6.99814453 13,6.55043453 13,5.99814453 L13,4.41419 L8.71571,8.69846 C8.32519,9.08899 7.69202,9.08899 7.3015,8.69846 C6.91097,8.30794 6.91097,7.67477 7.3015,7.28425 L11.5858,3 L9.99619141,3 C9.44391141,3 8.99619141,2.55228 8.99619141,2 C8.99619141,1.44772 9.44391141,1 9.99619141,1 L15,1 Z" />
                            </svg>
                        </div>
                        <p className="text-amber-400/80 text-sm tracking-wider uppercase truncate">{post.title}</p>
                        <p className="text-xs flex items-center gap-3">{CALENDAR_SVG} {`${new Intl.DateTimeFormat("en-US", dateOptions).format(post.created)}`} {PAGE_SVG} {post.readTime} min read</p>
                        <p className="text-xs min-h-[2lh] text-amber-600/40 line-clamp-2">{post.description}</p>
                    </div>
                </a>
            )}
        </div>
    );
}