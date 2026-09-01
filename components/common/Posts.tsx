import { CALENDAR_SVG, PAGE_SVG, POP_OUT_SVG } from '@/utils/elements';
import { formatDate } from '@/lib/content';
import type { Post } from '@/lib/content';

import Section from './Section';

export function PostCard({ post }: { post: Post }) {
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
                <p className="text-xs flex items-center gap-3">{CALENDAR_SVG} {formatDate(post.created)} {PAGE_SVG} {post.readTime} min read</p>
                <p className="text-xs min-h-[2lh] text-amber-600/40 line-clamp-2">{post.description}</p>
            </div>
        </a>
    );
}

export function PostGrid({ posts, emptyMessage = '// no posts yet' }: { posts: Post[], emptyMessage?: string }) {
    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
                <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32,8 L56,52 Q57,54 55,54 L9,54 Q7,54 8,52 Z" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                    <line x1="32" y1="24" x2="32" y2="38" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="32" cy="46" r="2" fill="#ef4444" />
                </svg>
                <p className="text-amber-600/40 text-xs uppercase tracking-widest">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
            {posts.map(post => <PostCard key={post.href} post={post} />)}
        </div>
    );
}

export function NoteGroupSection({ index, subject, children }: { index: string, subject: string, children?: React.ReactNode }) {
    return (
        <Section index={index} label={subject.replace(/-/g, ' ')} heading={subject.replace(/-/g, ' ')}>
            {children}
        </Section>
    );
}

export default PostGrid;
