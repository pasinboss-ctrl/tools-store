import Image from "next/image";
import { notFound } from "next/navigation";
import { qPromoList } from "@/sanity/lib/queries";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; 
import type { Image as SanityImage } from "sanity"; 
import Link from "next/link";

export const revalidate = 30;

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

//const rawPromos = await sanity.fetch<RawPromoData[]>(qPromoList);

// 3. เปลี่ยน Type สำหรับข้อมูลที่พร้อมใช้งาน
type ProcessedPromo = {
    slug: string;
    title: string;
    desc: string;
    content: string;
    imageUrl: string; 
};

/*const promoData: ProcessedPromo[] = rawPromos
    // ... (Map logic)
    .map((p) => ({
        slug: p.slug,
        title: p.title,
        desc: p.desc,
        content: p.fulldesc, // 💡 ตรวจสอบ: ถ้าไม่มี fulldesc ใน query จะเกิด error
        imageUrl: urlFor(p.banner!).url(), 
    }));
*/
// 💡 FIX 1: ย้ายการดึงข้อมูลทั้งหมดไปไว้ในฟังก์ชัน async เพื่อเลี่ยง Top-Level await
async function getPromoData(): Promise<ProcessedPromo[]> {
    const rawPromos = await sanity.fetch<RawPromoData[]>(qPromoList);
    
    return rawPromos
    .filter(p => p.banner) // กรองเฉพาะรายการที่มี banner
    .map((p) => ({
    slug: p.slug,
    title: p.title,
    desc: p.desc,
    content: p.fulldesc, 
    imageUrl: urlFor(p.banner!).url(), 
  }));
}
// ----------- Static Params ----------- //
export async function generateStaticParams() {
    const promoData = await getPromoData(); // ดึงข้อมูลภายในฟังก์ชัน
    return promoData.map(p => ({ slug: p.slug }));
}

// ----------- Metadata (SEO) ----------- //
export async function generateMetadata({
 params,
}: {
 // ✅ FIX 2: params ต้องเป็น Promise เพื่อผ่าน Type Check ใน generateMetadata
 params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params; // ✅ Await params
  const { slug } = resolvedParams;

  const promoData = await getPromoData();
  const p = promoData.find(item => item.slug === slug);

  const title = p ? `${p.title} | โปรโมชั่น` : "โปรโมชั่น";
  const description = p?.desc ?? "รายละเอียดโปรโมชั่นและข่าวสารล่าสุด";

 return {
 title,
 description,
    openGraph: {
        images: p ? [{ url: p.imageUrl }] : [],
    } };
}

type PromoDetailProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/*export default async function PromoDetail(
  { params }: { params: { slug: string } } // 💡 Note: params ไม่ใช่ Promise
) {
  // 1. รับ slug ออกมาจาก params (ไม่ต้อง await params)
  const { slug } = params; 
  
  // 2. ใช้ .find() เพื่อค้นหารายการที่มี slug ตรงกันใน Array
  const p = promoData.find(item => item.slug === slug); 
  
  if (!p) return notFound();
*/
export default async function PromoDetail(props: PromoDetailProps) {
  const { params } = props; // ดึง params ออกมา

  const resolvedParams = await params; // ✅ FIX 3: Await params
  const { slug } = resolvedParams;

  const promoData = await getPromoData(); // ✅ FIX 4: ดึงข้อมูลภายใน component
  const p = promoData.find(item => item.slug === slug); 

  if (!p) return notFound();
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold text-orange-400 mb-6">{p.title}</h1>
        <nav className="text-sm text-gray-400">
        <Link href="/" className="hover:text-white">หน้าแรก</Link> <span className="mx-1">/</span>
        <Link href="/promo" className="hover:text-white">โปรโมชั่น</Link> <span className="mx-1">/</span>
        <span className="text-gray-300">{p.title}</span>
      </nav>
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
