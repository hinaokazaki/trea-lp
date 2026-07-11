"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton, Message } from "./ui";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!email.trim() || !password) {
      setError("メールアドレスとパスワードを入力してください");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "ログインに失敗しました");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && <Message type="error">{error}</Message>}
      <div>
        <label
          htmlFor="admin-email"
          className="block text-xs font-medium text-[#4A4468] mb-1.5"
        >
          メールアドレス
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-[#D5D2E3] text-sm text-[#2B2A40] focus:outline-none focus:border-[#7E78A3] focus:ring-2 focus:ring-[#EFEDF5]"
        />
      </div>
      <div>
        <label
          htmlFor="admin-password"
          className="block text-xs font-medium text-[#4A4468] mb-1.5"
        >
          パスワード
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-[#D5D2E3] text-sm text-[#2B2A40] focus:outline-none focus:border-[#7E78A3] focus:ring-2 focus:ring-[#EFEDF5]"
        />
      </div>
      <LoadingButton type="submit" loading={submitting} className="w-full">
        ログイン
      </LoadingButton>
    </form>
  );
}
