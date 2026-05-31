import { NotesSubject } from '@/components/pages/Notes';

export default async function Page({ params }: { params: { subject: string } }) {
    const { subject } = await params;
    
    return <NotesSubject subject={subject} />;
}