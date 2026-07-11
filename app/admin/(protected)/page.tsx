import Link from "next/link";
import { Images, Plus, Tags } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [total, published, tagCount] = await Promise.all([
    prisma.galleryItem.count(),
    prisma.galleryItem.count({ where: { isPublished: true } }),
    prisma.tag.count(),
  ]);

  const stats = [
    { label: "投稿数", value: total },
    { label: "公開中", value: published },
    { label: "非公開", value: total - published },
    { label: "タグ数", value: tagCount },
  ];

  return (
    <div>
      <h1 className="text-lg font-bold text-[#312F55] mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[#E4E2EE] p-4"
          >
            <p className="text-[11px] text-[#8D8AA0] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#5D5786]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Link
          href="/admin/gallery/new"
          className="flex items-center gap-3 bg-[#7E78A3] text-white rounded-xl p-4 hover:bg-[#6A6390] transition-colors"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">新規投稿を作成</span>
        </Link>
        <Link
          href="/admin/gallery"
          className="flex items-center gap-3 bg-white border border-[#E4E2EE] rounded-xl p-4 text-[#4A4468] hover:bg-[#EFEDF5] transition-colors"
        >
          <Images size={18} className="text-[#7E78A3]" />
          <span className="text-sm font-medium">ギャラリーを管理</span>
        </Link>
        <Link
          href="/admin/tags"
          className="flex items-center gap-3 bg-white border border-[#E4E2EE] rounded-xl p-4 text-[#4A4468] hover:bg-[#EFEDF5] transition-colors"
        >
          <Tags size={18} className="text-[#7E78A3]" />
          <span className="text-sm font-medium">タグを管理</span>
        </Link>
      </div>
    </div>
  );
}
