import fs from 'fs';
import path from 'path';

import { notFound } from 'next/navigation';
import { unified } from 'unified';

import { CALENDAR_SVG, PAGE_SVG } from "@/utils/elements";

import { calcReadTime, formatDate } from '@/lib/content';

import { transformerCopyButton } from '@rehype-pretty/transformers';

import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import matter from 'gray-matter';
import 'katex/dist/katex.min.css';

interface MarkdownProps {
    blogPath: string;
    label?: string;
}

export async function Markdown({ blogPath, label = "// blog post" }: MarkdownProps) {
    const filePath = path.join(process.cwd(), 'public', blogPath);

    if (!fs.existsSync(filePath)) notFound();

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const title = data.title ?? content.split('\n')[0].replace(/^#+ /, '');
    const description = data.description ?? content.split('\n')[1]?.trim();
    const created = data.created ? new Date(data.created) : new Date(0);
    const updated = data.updated ? new Date(data.updated) : new Date(0);
    const readTime = calcReadTime(content);

    const html = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeKatex)
        .use(rehypePrettyCode, {
            theme: 'one-dark-pro',
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 2_000,
                }),
            ],
        })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);

    return (
        <div className="max-w-3xl mx-auto p-8 font-mono">
            <div className="border border-amber-600/20 bg-amber-600/5 p-4 mb-8 flex flex-col gap-2">
                <p className="text-amber-600/40 text-[10px] uppercase tracking-widest">{label}</p>
                <h1 className="text-amber-400 uppercase tracking-widest text-lg">{title}</h1>
                <p className="text-amber-600/50 text-xs">{description}</p>
                <div className="flex gap-6 mt-2 text-[10px] uppercase tracking-widest text-amber-600/40">
                    <span className="flex items-center gap-1">{CALENDAR_SVG} created {formatDate(created)}</span>
                    <span className="flex items-center gap-1">{CALENDAR_SVG} updated {formatDate(updated)}</span>
                    <span className="flex items-center gap-1">{PAGE_SVG} {readTime} min read</span>
                </div>
            </div>
            <div
                className="prose prose-invert prose-amber max-w-none font-mono
                    prose-headings:text-amber-400 prose-headings:uppercase prose-headings:tracking-widest
                    prose-p:text-amber-600/70
                    prose-td:text-amber-600/70
                    prose-a:text-amber-500 prose-a:hover:scale-110 prose-a:inline-block prose-a:underline prose-a:underline-offset-4 prose-a:transition-all prose-a:duration-200
                    prose-strong:text-amber-400
                    prose-pre:bg-black! prose-pre:border prose-pre:border-amber-600/20 prose-pre:rounded-sm
                    prose-code:text-amber-400 prose-code:bg-amber-600/10 prose-code:border prose-code:border-amber-600/20 prose-code:rounded-none prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
                    [&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:before:content-none [&_pre_code]:after:content-none
                    prose-blockquote:border-l-amber-600/40 prose-blockquote:text-amber-600/50
                    prose-li:text-amber-600/70 prose-hr:border-amber-600/20
                    [&_.katex]:text-amber-500"
                dangerouslySetInnerHTML={{ __html: String(html) }}
            />
        </div>
    );
}