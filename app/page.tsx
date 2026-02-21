import Link from "next/link";
import { STATUS_CATEGORIES, CATEGORY_STYLES, type StatusCode } from "@/lib/statuses";
import StatusImage from "@/components/StatusImage";

function StatusCard({ status }: { status: StatusCode }) {
  const styles = CATEGORY_STYLES[status.category];
  return (
    <Link
      href={`/${status.code}`}
      className={`bg-white border-2 ${styles.border} rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-[#c8973a] transition-all duration-150`}
    >
      <StatusImage code={status.code} name={status.name} variant="card" cardBg={styles.cardBg} />
      <div className="px-3.5 py-3">
        <div className={`font-mono text-xl font-bold ${styles.text}`}>{status.code}</div>
        <div className="text-xs text-[#7a4a20] mt-0.5">{status.name}</div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <div className="bg-linear-to-br from-[#ffe8b8] to-[#fdf0d5] border-b-2 border-[#e8c878] px-10 py-16 text-center">
        <h2 className="text-5xl font-bold text-[#5c3510] mb-3">Solar says it all 🐶</h2>
        <p className="font-mono bg-[#5c3510] text-[#ffe8b8] inline-block px-4 py-1.5 rounded-md text-lg">
          https://httpsolarthatgoldendoodle.dog/
          <span className="text-[#f0b840]">404</span>
        </p>
        <p className="mt-4 text-[#7a4a20] text-base">
          Just add a status code to the URL — Solar has a face for every situation.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-10 py-12 space-y-12">
        {STATUS_CATEGORIES.map((category) => (
          <section key={category.id}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#c8973a] border-b-2 border-[#e8c878] pb-2 mb-5">
              {category.label} — {category.tagline}
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
              {category.statuses.map((status) => (
                <StatusCard key={status.code} status={status} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
