import PGP from "@/components/pages/PGP";

import { metadata as templateMetadata } from "../layout";

import type { AbsoluteTemplateString } from "next/dist/lib/metadata/types/metadata-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: (templateMetadata.title as AbsoluteTemplateString)!.template!.replace(
    "%s",
    "PGP"
  ),
};

export default function PGP_Page() {
  return <PGP />;
}