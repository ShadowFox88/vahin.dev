import Posts from '../common/Posts';

import { Markdown } from '../common/Markdown';

export async function NotesPage() {
    return <Posts type="notes" number={3} />;
}

export async function NotesSubject({ subject }: { subject: string }) {
    return (
        <Posts type="notes" subject={subject} />
    );
}

export async function NotesSlug({ subject, topic }: { subject: string; topic: string }) {
    return (
        <div>
            <a href={`/notes/${subject}`} className="text-amber-600/40 hover:text-amber-500/60 text-[10px] uppercase tracking-widest transition-all duration-200 inline-block p-8 pb-0">
                ← // {subject.replace(/-/g, ' ')}
            </a>
            <Markdown blogPath={`notes/${subject}/${topic}.md`} type="notes" subject={subject} />
        </div>
    );
}