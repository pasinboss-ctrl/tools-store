import Image from "next/image";
import Link from "next/link";

export type PostItem = {
  slug: string;
  title: string;
  read?: string;
  tag?: string;
  img?: string;   // เส้นทางใน public เช่น "/content/drill-guide.jpg"
  alt?: string;
};

export default function ContentStrip({ items }: { items: PostItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-xl md:text-2xl font-bold text-white">บทความล่าสุด</h2>

      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {items.slice(0, 3).map((p) => (  // แสดง 3 กล่องล่าสุด
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-2xl overflow-hidden bg-[#1f1f1f] border border-gray-800
                       hover:border-orange-500 hover:shadow-[0_0_0_1px_#f97316] transition block"
          >
            {/* รูปปก */}
            <div className="relative aspect-[16/10]">
              {p.img ? (
                <Image
                  src={p.img}
                  alt={p.alt ?? p.title}
                  fill
                  sizes="(min-width: 500px) 33vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-500">
                  (ไม่มีรูป)
                </div>
              )}
              {/* ไล่เฉดทับเล็กน้อยให้ตัวอักษรอ่านง่าย */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              {/* แท็กมุมบนซ้าย */}
              {p.tag && (
                <span className="absolute left-3 top-3 text-xs px-2 py-0.5 rounded
                                   bg-orange-500/90 text-black font-semibold">
                  {p.tag}
                </span>
              )}
            </div>

            {/* เนื้อหา */}
            <div className="p-4">
              <div className="text-xs text-gray-400">{p.read ? `อ่าน ${p.read}` : "บทความ"}</div>
              <h3 className="mt-1 font-semibold text-white leading-snug group-hover:text-orange-300 transition">
                {p.title}
              </h3>
              <div className="mt-3 text-orange-400 text-sm">อ่านต่อ →</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
