import { headers, cookies } from 'next/headers';

import CopyButton from '@/components/common/CopyButton';

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-amber-600/40 text-xs uppercase tracking-widest">// {label}</p>
            <p className="text-amber-600/80 font-mono text-xs">{value}</p>
        </div>
    );
}

function Block({ label, text }: { label: string; text: string }) {
    return (
        <div>
            <p className="text-amber-600/40 text-xs uppercase tracking-widest mb-2">// {label}</p>
            <div className="relative">
                <pre className="text-amber-600/80 text-xs font-mono whitespace-pre-wrap wrap-anywhere overflow-x-auto border border-amber-600/20 p-4 rounded-sm">
                    {text}
                </pre>
                <CopyButton text={text} />
            </div>
        </div>
    );
}

type CapturedPayload = {
    method: string;
    url: string;
    query: Record<string, string>;
    headers: Record<string, string>;
    body: string;
    ip: string;
    timestamp: string;
};

function recordToText(record: Record<string, string>, sep: string): string {
    const entries = Object.entries(record);
    if (entries.length === 0) return '(none)';
    return entries.map(([k, v]) => `${k}${sep}${v}`).join('\n\n');
}

export default async function EchoPage() {
    const cookieStore = await cookies();
    const echoCookie = cookieStore.get('echo_data');

    let captured: CapturedPayload | null = null;
    if (echoCookie) {
        try {
            const decoded = Buffer.from(echoCookie.value, 'base64').toString('utf-8');
            captured = JSON.parse(decoded);
        } catch {
            captured = null;
        }
    }

    if (captured) {
        let bodyDisplay = captured.body?.length > 0 ? captured.body : '(empty)';
        try {
            bodyDisplay = JSON.stringify(JSON.parse(captured.body), null, 2);
        } catch {
            // leave as raw text
        }

        return (
            <main className="bg-black p-8 max-w-3xl mx-auto flex flex-col gap-8">
                <div className="flex gap-8 flex-wrap">
                    <Field label="method" value={captured.method} />
                    <Field label="remote ip" value={captured.ip} />
                    <Field label="timestamp" value={captured.timestamp} />
                </div>

                <Block label="url" text={captured.url} />
                <Block label="query params" text={recordToText(captured.query, ' = ')} />
                <Block label="headers" text={recordToText(captured.headers, ': ')} />
                <Block label="body" text={bodyDisplay} />

                <p className="text-amber-600/30 text-xs font-mono">
                    // captured via /api/echo — this data expires from the handoff cookie after 60s
                </p>
            </main>
        );
    }

    // Fallback: no handed-off data, so just show this page's own GET request info
    const headersList = await headers();
    const headerEntries: [string, string][] = [];
    headersList.forEach((value, key) => {
        headerEntries.push([key, value]);
    });
    const headersText = headerEntries.map(([k, v]) => `${k}: ${v}`).join('\n') || '(none)';
    const ip =
        headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headersList.get('x-real-ip') ||
        'unknown';

    return (
        <main className="bg-black p-8 max-w-3xl mx-auto flex flex-col gap-8">
            <div className="flex gap-8 flex-wrap">
                <Field label="method" value="GET" />
                <Field label="remote ip" value={ip} />
                <Field label="timestamp" value={new Date().toISOString()} />
            </div>

            <Block label="headers" text={headersText} />

            <p className="text-amber-600/30 text-xs font-mono">
                // no captured request found. send anything to /api/echo (any method, with a body
                // if you like) and you'll be redirected here with the full details rendered.
            </p>
        </main>
    );
}