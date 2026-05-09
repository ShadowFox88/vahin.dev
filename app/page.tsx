import { Home } from "@/components/pages/Home";

import { metadata as templateMetadata } from "./layout";

import type { AbsoluteTemplateString } from "next/dist/lib/metadata/types/metadata-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: (templateMetadata.title as AbsoluteTemplateString)!.template!.replace(
    "%s",
    "Home"
  ),
};

export default function Page() {
  return <Home />;
}