import { NextRequest, NextResponse } from 'next/server';

// Captures everything about the incoming request, stashes it in a short-lived
// cookie, then redirects the browser to /echo which renders it as a proper page.

async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        query[key] = value;
    });

    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
        headers[key] = value;
    });

    const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        req.headers.get('x-real-ip') ||
        'unknown';

    let rawBody = '';
    try {
        rawBody = await req.text();
    } catch {
        rawBody = '';
    }

    const payload = {
        method: req.method,
        url: req.url,
        query,
        headers,
        body: rawBody,
        ip,
        timestamp: new Date().toISOString(),
    };

    const encoded = Buffer.from(JSON.stringify(payload)).toString('base64');

    const response = NextResponse.redirect(new URL('/echo', req.url), { status: 303 });
    response.cookies.set('echo_data', encoded, {
        maxAge: 60, // short-lived — this is just a one-time handoff, not storage
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
    });
    return response;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;