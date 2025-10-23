import Image from "next/image";
import Link from "next/link";
import { qPromoList } from "@/sanity/lib/queries";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; 
import type { Image as SanityImage } from "sanity"; 

// 1. กำหนด Type ของข้อมูลที่ Fetch มา
type PromoData = {
    _id: string; // ใช้ _id แทน id ที่อาจเป็น null/undefined
    title: string;
    "slug": string; // สมมติว่า GROQ Query ใช้ Alias 'slug'
    desc: string;
    banner?: SanityImage; // ✅ ใช้ SanityImage
};

// 2. กำหนด Type ของข้อมูลที่ Map แล้วพร้อมใช้งานใน Component
type ProcessedPromo = {
    slug: string;
    title: string;
    desc: string;
    imageUrl: string; // ✅ Field ใหม่ที่เป็น URL string
};

// 3. Fetch และ Mapping ข้อมูล
const rawPromos = await sanity.fetch<PromoData[]>(qPromoList);

const promos: ProcessedPromo[] = rawPromos
    .filter(p => p.banner) // กรองเฉพาะรายการที่มีรูปภาพ
    .map((p) => ({
        slug: p.slug,
        title: p.title,
        desc: p.desc,
        // ✅ ใช้ urlFor เพื่อแปลง Sanity Image Object เป็น URL string
        imageUrl: urlFor(p.banner!).url(), 
    }));


/*const promos = [
  {
    slug: "lift",
    title: "โปรฯ ลิฟ ลดพิเศษ",
    img: "/Brochure/b1.jpg",
    desc: "ลดราคาลิฟ 30% สำหรับเดือนนี้เท่านั้น!",
  },
  {
    slug: "drill",
    title: "สว่าน 800W ราคาดีที่สุด",
    img: "/Brochure/b2.jpg",
    desc: "สว่านกำลังแรงทนทาน พร้อมของแถมสุดคุ้ม",
  },
  {
    slug: "pressure-washer",
    title: "เครื่องฉีดน้ำแรงดันสูง",
    img: "/Brochure/b3.jpg",
    desc: "โปรโมชั่นพิเศษ ลดเพิ่มอีก 15% เมื่อสั่งออนไลน์",
  },
];*/

export default function PromoPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-orange-400">
          โปรโมชั่น / โบรชัวร์
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((p) => (
            <Link
              key={p.slug}
              href={`/promo/${p.slug}`}
              className="group rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition"
            >
              <div className="relative h-90">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg group-hover:text-orange-400">{p.title}</h2>
                <p className="text-gray-400 text-sm mt-1">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
