import { metadata as templateMetadata } from "../../layout";

import type { AbsoluteTemplateString } from "next/dist/lib/metadata/types/metadata-types";
import type { Metadata } from "next";
import { BlogSlug } from "@/components/pages/Blog"

export const metadata: Metadata = {
    title: (templateMetadata.title as AbsoluteTemplateString)!.template!.replace(
        "%s",
        "blog"
    ),
};


export default async function Page({ params }: { params: { slug: string } }) {
    const blog = (await params).slug;

    return <BlogSlug blog={blog}/>   
}