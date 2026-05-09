import React from 'react'

interface SectionProps {
    index: string        // the number
    label: string        // the rotated bit
    heading: string      // the top bit
    children?: React.ReactNode
}

export default function section({ index, label, heading, children }: SectionProps) {
    const renderedLabel = `${index}  •  ${label}`

    return (
        <section className="flex flex-col relative pb-5" style={{ minHeight: `${renderedLabel.length}ch` }}>
            <p className="uppercase tracking-widest text-amber-600/50 text-xs absolute -z-10 whitespace-nowrap rotate-270 origin-top-right right-[calc(100%+25px)] top-0">
                {index}&nbsp;&nbsp;•&nbsp;&nbsp;{label}
            </p>
            <h1 className="block uppercase tracking-widest underline underline-offset-8 line-clamp-1 pb-5 text-amber-400/70 text-xs">
        // {heading}&nbsp;
            </h1>
            {children}
        </section>
    );
}