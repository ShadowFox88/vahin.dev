import "@/app/globals.css";

import type { Metadata } from "next";

import { Background, Navbar, Footer } from "@/components/common/Navigation"

import { KodeMono } from "@/utils/contants"

export const metadata: Metadata = {
    title: {
        template: "%s",
        default: "Vahin M",
    },
    description:
        "My personal site.",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <div className={`relative flex flex-col min-h-screen mx-auto h-screen w-screen overflow-hidden antialiased ${KodeMono.className}`}>
                    <Background />
                    <Navbar />
                    <div className="relative flex flex-col overflow-y-auto h-full overflow-x-hidden px-4 sm:px-8">
                        <main className="py-5 font-mono mx-auto max-w-4xl w-4xl">{children}</main>
                        <p className="grow"></p>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}