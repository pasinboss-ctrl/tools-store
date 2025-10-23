import Image from "next/image";
import Link from "next/link";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  tag?: string;
  read?: string;
  date: string;   // ISO string
};

export default function PostCard({ p }: { p: Post }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className="group rounded-2xl overflow-hidden bg-[#1f1f1f] border border-gray-800 hover:border-orange-500 hover:shadow-[0_0_0_1px_#f97316] transition block"
    >
      <div className="relative aspect-[16/10]">
        <Image src={p.cover} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        {p.tag && (
          <span className="absolute left-3 top-3 text-xs px-2 py-0.5 rounded bg-orange-500/90 text-black font-semibold">
            {p.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-400">
          {new Date(p.date).toLocaleDateString("th-TH")} · {p.read ?? "บทความ"}
        </div>
        <h3 className="mt-1 font-semibold text-white leading-snug group-hover:text-orange-300 transition line-clamp-2">
          {p.title}
        </h3>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">{p.excerpt}</p>
        <div className="mt-3 text-orange-400 text-sm">อ่านต่อ →</div>
      </div>
    </Link>
  );
}
