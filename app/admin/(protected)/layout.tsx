import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/server";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  robots: { index: false, follow: false },
};

// middlewareに加えてレイアウト側でも認証を確認する(多層防御)
export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
