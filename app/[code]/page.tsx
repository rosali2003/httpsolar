import { notFound } from "next/navigation";
import Link from "next/link";
import { getStatus, CATEGORY_STYLES, ALL_STATUSES } from "@/lib/statuses";
import StatusImage from "@/components/StatusImage";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  return ALL_STATUSES.map((s) => ({ code: String(s.code) }));
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const status = getStatus(Number(code));
  if (!status) return {};
  return {
    title: `${status.code} ${status.name} — httpsolarthatgoldendoodle.dog`,
    description: `HTTP ${status.code} ${status.name}, illustrated by Solar the Goldendoodle`,
  };
}

export default async function StatusPage({ params }: Props) {
  const { code } = await params;
  const status = getStatus(Number(code));
  if (!status) notFound();

  const styles = CATEGORY_STYLES[status.category];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 text-center">
      <div
        className={`w-full max-w-lg rounded-2xl border-4 ${styles.border} overflow-hidden mb-8 shadow-md`}
      >
        <StatusImage code={status.code} name={status.name} variant="full" cardBg={styles.cardBg} />
      </div>

      <p className={`font-mono text-7xl font-bold mb-2 ${styles.text}`}>{status.code}</p>
      <p className="text-2xl text-[#5c3510] font-semibold mb-6">{status.name}</p>

      <Link
        href="/"
        className="font-mono text-sm text-[#c8973a] border border-[#e8c878] rounded-full px-5 py-2 hover:bg-[#ffe8b8] transition-colors"
      >
        ← back to all codes
      </Link>
    </div>
  );
}
