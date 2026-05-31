import { NotesSlug } from '@/components/pages/Notes';

export default async function Page({ params }: { params: { subject: string; topic: string } }) {
    const { subject, topic } = await params;

    return <NotesSlug subject={subject} topic={topic} />;
}