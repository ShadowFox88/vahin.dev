import { BlogSlug } from "@/components/pages/Blog"

export default async function Page({ params }: { params: { blog: string } }) {
    const { blog } = await params

    return <BlogSlug blog={blog}/>   
}