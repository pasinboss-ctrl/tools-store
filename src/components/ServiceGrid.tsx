// src/components/ServiceGrid.tsx
import Image from "next/image";
import Link from "next/link";

export type Category = {
  title: string;
  href: string;
  img: string;   // ตัวอย่าง: "/icons/tire-remover.png"
  alt?: string;
  desc?: string;
};

export default function ServiceGrid({ items }: { items: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-xl md:text-2xl font-bold text-white">หมวดเด่น</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {items.map((it, i) => (
          <Link
            key={i}
            href={it.href}
            aria-label={it.title}
            className={[
              // กรอบการ์ดพื้นฐาน + ทรานซิชัน
              "group relative overflow-hidden rounded-2xl bg-[#000000]",
              "border border-gray-800 transition",
              // Desktop: hover | คีย์บอร์ด: focus-visible | Mobile: active
              "hover:border-orange-500 focus-visible:border-orange-500 active:border-orange-500",
              "focus:outline-none"
            ].join(" ")}
          >
            {/* Glow overlay — แสดงเมื่อ hover/focus/active */}
            <div
              className={[
                "pointer-events-none absolute inset-0 rounded-2xl",
                "opacity-20",                      // เปิดไฟอ่อน ๆ ตลอดเวลา (ช่วย mobile เห็นมิติ)
                "shadow-[0_0_30px_0_#f97316]",     // soft glow base
                "transition",
                // เพิ่มความเข้มเมื่อโฟกัส/แตะ/โฮเวอร์
                "group-hover:opacity-60 group-focus-visible:opacity-60 group-active:opacity-60"
              ].join(" ")}
            />

            {/* วงแหวนส้มขอบนอก (เน้นตอนโฟกัส/แตะ) */}
            <div
              className={[
                "pointer-events-none absolute inset-0 rounded-2xl",
                "ring-1 ring-orange-500/30 blur-[0.5px]",
                "group-hover:ring-orange-500 group-focus-visible:ring-orange-500 group-active:ring-orange-500",
                "transition"
              ].join(" ")}
            />

            {/* รูปไอคอน */}
            <div className="relative aspect-square flex items-center justify-center">
              <Image
                src={it.img}
                alt={it.alt ?? it.title}
                width={320}
                height={320}
                priority={i < 2}
                className={[
                  "object-contain p-6 transition-transform duration-200",
                  "group-hover:scale-[1.15] group-focus-visible:scale-[1.05] group-active:scale-[0.97]"
                ].join(" ")}
              />
            </div>

            {/* ข้อความ */}
            <div className="relative p-4">
              <div className="font-semibold text-white">{it.title}</div>
              {it.desc && <div className="text-gray-400 text-sm">{it.desc}</div>}
              <div className="text-orange-400 text-sm mt-2 transition group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                ดูสินค้า →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
