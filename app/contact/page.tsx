import { metadata as templateMetadata } from "../layout";

import type { AbsoluteTemplateString } from "next/dist/lib/metadata/types/metadata-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: (templateMetadata.title as AbsoluteTemplateString)!.template!.replace(
        "%s",
        "test"
    ),
};

export default function Test() {
    let bg_list = [];
    for (let i = 0; i < 5000; i++) {
        bg_list.push(Math.random().toString(36).toUpperCase().substring(2, 3));
    }

    const svg = <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" x2="100" y1="50" y2="50" stroke="white" strokeWidth="1" opacity="0.4"/>
        <line x1="50" x2="50" y1="0" y2="100" stroke="white" strokeWidth="1" opacity="0.4"/>
        <line x1="42.5" x2="57.5" y1="50" y2="50" stroke="white" strokeWidth="3" opacity="0.4"/>
        <line x1="50" x2="50" y1="42.5" y2="57.5" stroke="white" strokeWidth="3" opacity="0.4"/>
    </svg>
    const tiles = Array.from({ length: 500 });

    return <div className="blur-[2px] max-h-screen overflow-hidden fixed inset-0 -z-10">
        <div className="flex flex-wrap text-[4px] text-white opacity-40">
            {bg_list.map((char, index) => <div key={char + index.toString() + "_bg"} className="p-2">{char}</div>)}
        </div>
        <div className="absolute inset-0 flex flex-wrap pointer-events-none">
                {tiles.map((_, i) => (
                    <div key={i} className="w-16 h-16 shrink-0">
                        {svg}
                    </div>
                ))}
            </div>
    </div>
}