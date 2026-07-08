"use client";

import { useState } from "react";
import Image from "next/image";
import type { FilterSlug, GalleryItemWithTags } from "@/types/gallery";

const FILTER_TABS: { label: string; slug: FilterSlug }[] = [
  { label: "すべて", slug: "all" },
  { label: "ワンカラー", slug: "one-color" },
  { label: "シンプルアート", slug: "simple-art" },
  { label: "ニュアンス", slug: "nuance" },
  { label: "フレンチ", slug: "french" },
  { label: "フット", slug: "foot" },
  { label: "春・夏", slug: "spring-summer" },
  { label: "秋・冬", slug: "autumn-winter" },
];

type Props = { items: GalleryItemWithTags[] };

export default function GalleryClient({ items }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterSlug>("all");

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((item) =>
          item.tags.some((t) => t.tag.slug === activeFilter)
        );

  return (
    <>
      {/* Filter tabs */}
      <div className="py-5 px-6 border-b border-stone-200">
        <p className="text-[11px] font-medium text-stone-400 tracking-[.1em] uppercase mb-3">
          FILTER
        </p>
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveFilter(tab.slug)}
              className={`px-4 py-1.5 rounded-full text-xs transition-colors ${
                activeFilter === tab.slug
                  ? "bg-[#D4537E] border border-[#D4537E] text-white font-medium"
                  : "border border-stone-200 text-stone-500 hover:border-stone-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div className="py-8 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {filtered.map((item) => {
            const designTag = item.tags.find((t) => t.tag.type === "DESIGN");
            return (
              <div
                key={item.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-stone-100 group cursor-pointer"
              >
                <Image
                  src={item.imageUrl}
                  alt={
                    item.title
                      ? item.title
                      : `${designTag?.tag.name ?? "ネイル"}（仮画像 / PLACEHOLDER）`
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[rgba(153,53,86,.55)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {designTag?.tag.name}
                  </span>
                </div>
                {/* Tag badge */}
                {designTag && (
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-white text-[#993556] font-medium px-2 py-0.5 rounded-full">
                    {designTag.tag.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-stone-400 py-12">
            該当するデザインがありません
          </p>
        )}
      </div>
    </>
  );
}
