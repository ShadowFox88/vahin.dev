import "./globals.css";

import type { Metadata } from "next";

import { Google_Sans_Code } from 'next/font/google';

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

const google_sans_code = Google_Sans_Code({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-google_sans_code'
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>

            <Navbar />

            <html lang="en">
                

                <body className="antialiased">{children}</body>

            </html>

            <Footer />

        </>
    );
}