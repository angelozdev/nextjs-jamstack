import { Document } from "@contentful/rich-text-types";

export function getRichText(document?: Document): Document | null {
  if (!document) return null;

  return {
    ...document,
    content: [...document.content.slice(0, 1)],
  };
}
