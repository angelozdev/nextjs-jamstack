interface Asset {
  sys: Sys;
  contentfulMetadata: ContentfullMetadata;
  title: string;
  description: string;
  contentType: string;
  fileName: string;
  size: number;
  url: string;
  width: number;
  height: number;
  linkedFrom: AssetLinkingCollections;
}

interface LinkingCollections {
  skip: number;
  limit: number;
  preview: boolean;
  locale: string;
}

interface ContentfullMetadata {
  tags: ContentfulTag[];
}

interface ContentfulTag {
  id: string;
  name: string;
}

interface Sys {
  id: string;
  spaceId: string;
  environmentId: string;
  publishedAt: Date;
  firstPublishedAt: Date;
  publishedVersion: number;
}
