import Hero from "@/components/Hero";
import BrochureSlider, { BrochureItem } from "@/components/BrochureSlider";
import ServiceGrid, { Category } from "@/components/ServiceGrid";
import ContentStrip, { PostItem } from "@/components/ContentStrip";
import Contact from "@/components/Contact";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { qPromoList } from "@/sanity/lib/queries";
import { qContentList } from "@/sanity/lib/queries";
import { Image } from "sanity";

export const revalidate = 30;

//const brochures: BrochureItem[] = [
 // { id: 1, title: "ลิฟท์ยกรถ 2 เสา", img: "/Brochure/b1.jpg", href: "/promo/lift" },
 // { id: 2, title: "เครื่องถอดยาง", img: "/Brochure/b2.jpg", href: "/promo/tire" },
 // { id: 3, title: "แพ็กเกจชุดใหญ่", img: "/Brochure/b3.jpg", href: "/promo/package" },
 // { id: 4, title: "แพ็กเกจชุดใหญ่", img: "/Brochure/b3.jpg", href: "/promo/package" },
 // { id: 5, title: "แพ็กเกจชุดใหญ่", img: "/Brochure/b3.jpg", href: "/promo/package" }
//];
const categories: Category[] = [
  { title: "ลิฟต์ยกรถ",       img: "/icon/car-lift-hydraulic.png", href: "/products?cat=ลิฟท์ยกรถ",    desc: "Car lift Hydraulic" },
  { title: "เครื่องถอดยาง",   img: "/icon/tire-remover.png",       href: "/products?cat=เครื่องถอดยาง",    desc: "Tire Remover" },
  { title: "เครื่องถ่วงล้อ",   img: "/icon/tire-balancer.png",      href: "/products?cat=เครื่องถ่วงยาง", desc: "Tire Balancer" },
  { title: "อุปกรณ์ซ่อมบำรุงช่วงล่าง",   img: "/icon/chassis-maintenance-equipment.png",       href: "/products?cat=อุปกรณ์ซ่อมบำรุงช่วงล่าง",    desc: "Chassis Maintenance Equipment" },
  { title: "เครื่องตั้งศูนย์",   img: "/icon/wheel-alignment-machine.png",      href: "/products?cat=เครื่องตั้งศูนย์", desc: "Wheel Alignment Machine" },
  { title: "ห้องพ่นสี",   img: "/icon/paint-booth.png",       href: "/products?cat=ห้องพ่นสี",    desc: "Paint Booth" },
  { title: "อุปกรณ์ช่าง",   img: "/icon/tool-set.png",           href: "/products?cat=อุปกรณ์ช่าง", desc: "Tool Set" },
  { title: "อื่นๆ",   img: "/icon/others.png",      href: "/products?cat=อื่นๆ", desc: "Others" }
 
  
];

/*
const posts: PostItem[] = [
  { slug: "air-compressor-checklist", title: "5 เช็กลิสต์ก่อนซื้อปั๊มลม", read: "2 นาที", tag: "CHECKLIST", img: "/content/air-compressor-checklist.jpg" },
  { slug: "engine-oil-grade",        title: "เกรดน้ำมันเครื่อง เลือกยังไงให้เหมาะ", read: "4 นาที", tag: "TIPS", img: "/content/engine-oil-grade.jpg" },
  { slug: "drill-selection-guide",   title: "คู่มือเลือกสว่าน: ไร้สาย vs สายไฟ", read: "3 นาที", tag: "GUIDE", img: "/content/drill-selection-guide.jpg" },
];
*/

console.log("GROQ qPromoList >>>\n", qPromoList);
console.log("GROQ qContentList >>>\n", qContentList);

//const data: {
// items: { title: string; slug: string; img?: Image }[];
//} = await sanity.fetch(qPromoList);

const data = await sanity.fetch<{ id:number ; title: string; slug: string; banner?: Image,startsAt: string,endsAt: string,isActive: boolean}[]>(qPromoList);
const content_data = await sanity.fetch<{ id:number ; title: string; slug: string; tag: string, banner?: Image,startsAt: string,endsAt: string,isActive: boolean}[]>(qContentList);

const brochuresFromSanity: BrochureItem[] = data.map((p) => ({ 
  // 💡 โครงสร้างต้องตรงกับ BrochureItem
  id: p.id, // หรือใช้ค่าอื่นที่เป็น unique
  title: p.title,
  href: `/promo/${p.slug}`, 
  img: p.banner ? urlFor(p.banner).url() : "",
  startsAt : p.startsAt,
  endsAt : p.endsAt,
  isActive : p.isActive
}));

const contentFromSanity: PostItem[] = content_data.map((p) => ({ 
  id: p.id, 
  title: p.title,
  slug: p.slug,
  href: p.slug, 
  tag : p.tag,
  img: p.banner ? urlFor(p.banner).url() : "",
  startsAt : p.startsAt,
  endsAt : p.endsAt,
  isActive : p.isActive
}));



console.log("Image URL ที่ถูกสร้าง:", brochuresFromSanity[0]?.img);

export default async function Home(){
  return (
    <main className="bg-black text-white">
   
      <Hero />
        <section className="mx-auto max-w-7xl px-4 mt-8">
          <h2 className="text-xl md:text-2xl font-bold">โปรโมชัน / โบรชัวร์</h2>
          <div className="mt-3">
            <BrochureSlider items={brochuresFromSanity} />
          </div>
        </section>
      <ServiceGrid items={categories} />
      <ContentStrip items={contentFromSanity} />
      <Contact />

    </main>
  );
}

console.log("PAGE TEST:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);