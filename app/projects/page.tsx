import { metadata as templateMetadata } from "../layout";

import type { AbsoluteTemplateString } from "next/dist/lib/metadata/types/metadata-types";
import type { Metadata } from "next";
import ComingSooner from "@/components/pages/ComingSooner";

export const metadata: Metadata = {
    title: (templateMetadata.title as AbsoluteTemplateString)!.template!.replace(
        "%s",
        "test"
    ),
};

export default function Projects() {
    return <ComingSooner />
}