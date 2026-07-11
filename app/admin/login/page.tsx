import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "管理画面ログイン | TRE'A nails",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F7F6FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-serif text-xl font-medium text-[#312F55]">
            TRE&rsquo;A
          </p>
          <p className="text-[11px] text-[#8D8AA0] tracking-[.12em] mt-1">
            サロンオーナー専用管理画面
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E4E2EE] shadow-sm p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
