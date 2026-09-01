import PostGrid, { NoteGroupSection } from '../common/Posts';

import { Markdown } from '../common/Markdown';

import { getNotesGroups } from '@/lib/content';

export async function NotesPage() {
    const groups = getNotesGroups(undefined, 3);
    return (
        <div className="pt-2 pb-8 flex flex-col w-full">
            {groups.map(({ subj, posts, index }) => (
                <NoteGroupSection key={subj} index={index} subject={subj}>
                    <PostGrid posts={posts} emptyMessage="// no notes yet" />
                    <a href={`/notes/${subj}`} className="text-amber-600/40 hover:text-amber-500/60 text-[10px] uppercase tracking-widest transition-all duration-200 pb-8 inline-block">
                        {"// view all →"}
                    </a>
                </NoteGroupSection>
            ))}
        </div>
    );
}

export async function NotesSubject({ subject }: { subject: string }) {
    const { posts } = getNotesGroups(subject)[0];
    const unsectioned = posts.filter(p => !p.subsection);
    const subsections = [...new Set(posts.filter(p => p.subsection).map(p => p.subsection!))]
        .sort();

    return (
        <div className="pt-2 pb-8 flex flex-col w-full">
            {unsectioned.length > 0 && (
                <PostGrid posts={unsectioned} emptyMessage="// no notes yet" />
            )}
            {subsections.map((sub, i) => {
                const subPosts = posts.filter(p => p.subsection === sub);
                return (
                    <NoteGroupSection key={sub} index={String(i + 1).padStart(2, '0')} subject={sub}>
                        <PostGrid posts={subPosts} />
                    </NoteGroupSection>
                );
            })}
        </div>
    );
}

export async function NotesSlug({ subject, topic }: { subject: string; topic: string }) {
    return (
        <div>
            <a href={`/notes/${subject}`} className="text-amber-600/40 hover:text-amber-500/60 text-[10px] uppercase tracking-widest transition-all duration-200 inline-block p-8 pb-0">
                {"← // "}{subject.replace(/-/g, ' ')}
            </a>
            <Markdown blogPath={`notes/${subject}/${topic}.md`} label={`// ${subject.replace(/-/g, ' ')}`} />
        </div>
    );
}
