export type TagType = "DESIGN" | "SEASON";

export type GalleryTag = {
  id: string;
  name: string;
  slug: string;
  type: TagType;
};

export type GalleryItemWithTags = {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
  tags: { tag: GalleryTag }[];
};

export type FilterSlug =
  | "all"
  | "one-color"
  | "simple-art"
  | "nuance"
  | "french"
  | "foot"
  | "spring-summer"
  | "autumn-winter";
