import Image from "next/image";
import Link from "next/link";

export type Product = {
  slug: string;
  name: string;
  price?: number;
  img: string;         // ใช้เป็นรูปหลักได้
  images?: string[];   // ← เพิ่มอาร์เรย์รูปย่อย/รูปทั้งหมด (รวมรูปหลักด้วยก็ได้)
  badge?: string;
  category: string;
};


export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className="group rounded-2xl bg-[#1f1f1f] border border-gray-800 hover:border-orange-500 transition overflow-hidden">
      <Link href={`/products/${p.slug}`}>
        <div className="relative aspect-square">
          <Image src={p.img} alt={p.name} fill className="object-contain p-4" sizes="(min-width:1024px) 25vw, 50vw" />
          {p.badge && (
            <span className="absolute left-3 top-3 text-xs px-2 py-0.5 rounded bg-orange-500 text-black font-semibold">
              {p.badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="text-white font-semibold line-clamp-2 h-14">
            {p.name}
          </div>
          <div className="mt-1 text-sm text-gray-400">{p.category}</div>
          <div className="mt-2 text-orange-400 font-bold">
            {p.price ? `฿${p.price.toLocaleString()}` : "ติดต่อสอบถามราคา"}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <a
          href="https://line.me/R/ti/p/@highpro"
          target="_blank"
          className="inline-flex items-center justify-center w-full rounded-xl border border-orange-500 text-orange-400 px-3 py-2 hover:bg-orange-500 hover:text-black transition"
        >
          ทัก LINE สอบถาม
        </a>
      </div>
    </div>
  );
}
