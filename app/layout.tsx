import "./globals.css";

import type { Metadata } from "next";

import { Google_Sans_Code } from 'next/font/google';
import { Geist_Mono } from "next/font/google";

import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"

export const metadata: Metadata = {
    title: {
        template: "%s - vahin.dev",
        default: "vahin.dev",
    },
    description:
        "My personal site.",
};

const GeistMono = Geist_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-geist_mono'
})

const GoogleSansCode = Google_Sans_Code({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-google_sans_code',
    adjustFontFallback: false
})

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className={`px-6 antialiased max-w-5xl relative mx-auto ${GoogleSansCode.className}`}>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="py-5">{children}</div>
                    <p className="grow"></p>
                    <Footer />
                </div>
            </body>
        </html>
    );
}