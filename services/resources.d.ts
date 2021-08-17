// Entities
interface ContentfullEntity {
  sys: Sys;
  contentfulMetadata: ContentfullMetadata;
  __typename: string;
}
interface Asset extends ContentfullEntity {
  title: string;
  description: string;
  contentType: string;
  fileName: string;
  size: number;
  url: string;
  width: number;
  height: number;
}

interface Author extends ContentfullEntity {
  photo: Asset;
  fullName: string;
  handle: string;
  biography: string;
  twitter: string;
  linkedIn: string;
}

interface Plant extends ContentfullEntity {
  plantName: string;
  slug: string;
  description: PlantDescription;
  image: Asset;
  category: Category;
  author: Author;
}

interface Category extends ContentfullEntity {
  title: string;
  slug: string;
  icon: Asset;
  categoryDescription: string;
}

interface ContentfullMetadata {
  tags: ContentfulTag[];
}

interface ContentfulTag {
  id: string;
  name: string;
}

interface PlantDescription {
  json: import("@contentful/rich-text-types/dist/types/types").Document;
  links: PlantDescriptionLinks;
}

interface PlantDescriptionLinks {
  entries: any;
  assets: any;
}

interface Sys {
  id: string;
  spaceId: string;
  environmentId: string;
  publishedAt: Date;
  firstPublishedAt: Date;
  publishedVersion: number;
}

// Collections
interface Collection<T> {
  skip: number;
  limit: number;
  items: T[];
  total: number;
}

type AssetCollection = Collection<Asset>;
type AuthorCollection = Collection<Author>;
type PlantCollection = Collection<Partial<Plant>>;
type CategoryCollection = Collection<Category>;

// Orders
type AssetOrder =
  | "url_ASC"
  | "url_DESC"
  | "size_ASC"
  | "size_DESC"
  | "contentType_ASC"
  | "contentType_DESC"
  | "fileName_ASC"
  | "fileName_DESC"
  | "width_ASC"
  | "width_DESC"
  | "height_ASC"
  | "height_DESC"
  | "sys_id_ASC"
  | "sys_id_DESC"
  | "sys_publishedAt_ASC"
  | "sys_publishedAt_DESC"
  | "sys_firstPublishedAt_ASC"
  | "sys_firstPublishedAt_DESC"
  | "sys_publishedVersion_ASC"
  | "sys_publishedVersion_DESC";

type AuthorOrder =
  | "fullName_ASC"
  | "fullName_DESC"
  | "handle_ASC"
  | "handle_DESC"
  | "twitter_ASC"
  | "twitter_DESC"
  | "linkedIn_ASC"
  | "linkedIn_DESC"
  | "sys_id_ASC"
  | "sys_id_DESC"
  | "sys_publishedAt_ASC"
  | "sys_publishedAt_DESC"
  | "sys_firstPublishedAt_ASC"
  | "sys_firstPublishedAt_DESC"
  | "sys_publishedVersion_ASC"
  | "sys_publishedVersion_DESC";

type PlantOrder =
  | "slug_ASC"
  | "slug_DESC"
  | "sys_id_ASC"
  | "sys_id_DESC"
  | "sys_publishedAt_ASC"
  | "sys_publishedAt_DESC"
  | "sys_firstPublishedAt_ASC"
  | "sys_firstPublishedAt_DESC"
  | "sys_publishedVersion_ASC"
  | "sys_publishedVersion_DESC";

type CategoryOrder =
  | "slug_ASC"
  | "slug_DESC"
  | "sys_id_ASC"
  | "sys_id_DESC"
  | "sys_publishedAt_ASC"
  | "sys_publishedAt_DESC"
  | "sys_firstPublishedAt_ASC"
  | "sys_firstPublishedAt_DESC"
  | "sys_publishedVersion_ASC"
  | "sys_publishedVersion_DESC";

// Options
interface Options<Order> {
  skip?: number;
  limit?: number;
  order?: [Order] | Order;
}
