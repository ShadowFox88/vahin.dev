import { BlogSlug } from "@/components/pages/Blog"

export default async function Page({ params }: { params: { slug: string } }) {
    const blog = (await params).slug;

    return <BlogSlug blog={blog}/>   
}