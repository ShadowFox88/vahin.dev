import "./globals.css";

import type { Metadata } from "next";

import { Geist_Mono } from "next/font/google";
import { Geist } from "next/font/google"

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

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className={`px-6 antialiased max-w-3xl relative mx-auto ${GeistMono.className}`}>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="py-5 font-mono">{children}</main>
                    <p className="grow"></p>
                    <Footer />
                </div>
            </body>
        </html>
    );
}