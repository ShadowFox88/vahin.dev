import Section from "../common/Section";

export default async function ComingSooner() {
    return (
        <Section index="01" label="coming soon" heading="site under reconstruction">
            <div className="py-16 flex flex-col gap-2">
                <p className="text-amber-600/20 text-xs tracking-widest font-mono uppercase">
                    // 01 • status
                </p>
                <p className="text-amber-500/60 text-5xl tracking-[0.3em] font-mono uppercase leading-tight">
                    check back
                </p>
                <p className="text-amber-600/30 text-5xl tracking-[0.3em] font-mono uppercase leading-tight">
                    soon
                </p>
            </div>
        </Section>
    )
}