import Image from "next/image";
import { notFound } from "next/navigation";
import { qPromoList } from "@/sanity/lib/queries";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; 
import type { Image as SanityImage } from "sanity"; 

/*const promoData = {
        lift: {
            title: "โปรฯ น้ำมันเครื่อง ลดพิเศษ",
            img: "/Brochure/b1.jpg",
            content: `ลดราคาน้ำมันเครื่องสำหรับช่างมืออาชีพ
        พิเศษเมื่อซื้อครบ 3 แกลลอน แถมฟรีกรองน้ำมันเครื่อง 1 ชิ้น!`,
        },
        drill: {
            title: "สว่าน 800W ราคาดีที่สุด",
            img: "/Brochure/b2.jpg",
            content: `สว่านกำลังแรง 800W เจาะคอนกรีตได้สบาย 
            รับประกัน 1 ปีเต็ม พร้อมโปรโมชั่นของแถมดอกสว่าน 5 ชิ้น`,
        },
        "pressure-washer": {
            title: "เครื่องฉีดน้ำแรงดันสูง",
            img: "/Brochure/b3.jpg",
            content: `แรงดันสูงสุด 180 บาร์ 
            ทำความสะอาดรถยนต์และพื้นโรงงานได้สะอาดสุด!`,
        },
    };*/

type RawPromoData = {
  title : string;
  "slug": string;
  desc : string;
  fulldesc : string;
  banner?: SanityImage;
};

const rawPromos = await sanity.fetch<RawPromoData[]>(qPromoList);

// 3. เปลี่ยน Type สำหรับข้อมูลที่พร้อมใช้งาน
type ProcessedPromo = {
    slug: string;
    title: string;
    desc: string;
    content: string;
    imageUrl: string; // ✅ Field นี้เป็น URL string แล้ว
};
const promoData: ProcessedPromo[] = rawPromos
    // ... (Map logic)
    .map((p) => ({
        slug: p.slug,
        title: p.title,
        desc: p.desc,
        content: p.fulldesc, // 💡 ตรวจสอบ: ถ้าไม่มี fulldesc ใน query จะเกิด error
        imageUrl: urlFor(p.banner!).url(), 
    }));


export default async function PromoDetail(
  { params }: { params: { slug: string } } // 💡 Note: params ไม่ใช่ Promise
) {
  // 1. รับ slug ออกมาจาก params (ไม่ต้อง await params)
  const { slug } = params; 
  
  // 2. ใช้ .find() เพื่อค้นหารายการที่มี slug ตรงกันใน Array
  const p = promoData.find(item => item.slug === slug); 
  
  if (!p) return notFound();

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold text-orange-400 mb-6">{p.title}</h1>
        <div className="relative mt-4 aspect-[12/10] rounded-2xl overflow-hidden bg-[#1f1f1f] border border-gray-800">
          <Image
            src={p.imageUrl}
            alt={p.title}
            width={1280}
            height={720}
            className="object-cover"
          />
        </div>
        <article className="mt-6 text-gray-200 leading-relaxed whitespace-pre-line">
          <h2> {p.desc}</h2><br/>
          {p.content}
        </article>
      </section>
    </main>
  );
}
