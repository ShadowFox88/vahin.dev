import Section from "../common/Section";
import Posts from "../common/Posts";

import { Markdown } from '../common/Markdown';

export const runtime = 'nodejs';

interface BlogSlugProps {
    blog: string;
}

export async function Blog() {
    return (
        <Section index="01" label="blog" heading="my thoughts">
            <Posts type="blog"/>
        </Section>
    );
}

export async function BlogSlug({ blog }: BlogSlugProps) {
    return <Markdown blogPath={`blog_posts/${blog}.md`} />
}