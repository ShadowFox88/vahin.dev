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
    for (let i = 0; i < 1000; i++) {
        bg_list.push(Math.random().toString(36).toUpperCase().substring(2,3));
    }

    console.log(bg_list);

    return <div className="flex flex-wrap overflow-hidden text-xs max-h-screen">
        {bg_list.map((char, index) => <div key={char + index.toString() + "_bg"} className="p-10">{char}</div>)}
    </div>;
}