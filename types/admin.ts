import type { GalleryTag, TagType } from "@/types/gallery";

// 管理画面で扱うGalleryItem(日時はISO文字列に変換して受け渡す)
export type AdminGalleryItem = {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  tags: { tag: GalleryTag }[];
};

export type AdminTag = {
  id: string;
  name: string;
  slug: string;
  type: TagType;
  usageCount: number;
};
