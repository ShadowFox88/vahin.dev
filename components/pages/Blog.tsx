import Section from "../common/Section";
import PostGrid from "../common/Posts";

import { Markdown } from '../common/Markdown';

import { getBlogPosts } from '@/lib/content';

export const runtime = 'nodejs';

interface BlogSlugProps {
    blog: string;
}

export async function Blog() {
    const posts = getBlogPosts();
    return (
        <Section index="01" label="blog" heading="my thoughts">
            <div className="pt-2 pb-8 flex flex-col w-full">
                <PostGrid posts={posts} />
            </div>
        </Section>
    );
}

export async function BlogSlug({ blog }: BlogSlugProps) {
    return <Markdown blogPath={`blog_posts/${blog}.md`} label="// blog post" />
}
