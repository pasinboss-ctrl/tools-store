import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
//import type { Metadata } from "next";
//import type { Post } from "@/components/PostCard";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; 
import type { Image as SanityImage } from "sanity"; 
import { qContentList } from "@/sanity/lib/queries";

/*
const allPosts: Post[] = [
  {
    slug: "air-compressor-checklist",
    title: "5 เช็กลิสต์ก่อนซื้อปั๊มลม",
    excerpt: "เลือกขนาดถัง กำลังมอเตอร์ และค่า CFM ให้เหมาะกับงานจริง",
    cover: "/content/air-compressor-checklist.jpg",
    tag: "CHECKLIST",
    read: "2 นาที",
    date: "2025-09-01",
  },
  {
    slug: "engine-oil-grade",
    title: "เกรดน้ำมันเครื่อง เลือกยังไงให้เหมาะ",
    excerpt: "เข้าใจตัวเลขความหนืด SAE และมาตรฐาน API",
    cover: "/content/engine-oil-grade.jpg",
    tag: "TIPS",
    read: "4 นาที",
    date: "2025-08-20",
  },
  {
    slug: "drill-selection-guide",
    title: "คู่มือเลือกสว่าน: ไร้สาย vs สายไฟ",
    excerpt: "เทียบแรงบิด แบต ความทนทาน และความคุ้มค่า",
    cover: "/content/drill-selection-guide.jpg",
    tag: "GUIDE",
    read: "3 นาที",
    date: "2025-08-05",
  },
];
*/

type ContentData = {
  id: number; 
  title: string; 
  "slug": string; 
  tag: string;
  desc: string;
  fulldesc: string;
  banner?: SanityImage;
  date: string;
};

type Post = {
    slug: string;
    title: string;
    desc: string;
    excerpt: string; 
    tag: string;
    cover: string; 
    date: string;
}

// -------------------------------------------------------------------
// ✅ 1. ฟังก์ชันดึงข้อมูล
// -------------------------------------------------------------------
async function getAllPosts(): Promise<Post[]> {
    const rawContent = await sanity.fetch<ContentData[]>(qContentList);
    
    const allPosts: Post[] = rawContent
        .filter(p => p.banner) 
        .map((p) => ({
            slug: p.slug,
            title: p.title,
            desc: p.desc,
            excerpt: p.fulldesc, 
            tag: p.tag,
            cover: urlFor(p.banner!).url(), 
            date : p.date,
        }));
    return allPosts;
}


// -------------------------------------------------------------------
// ✅ 2. generateStaticParams 
// -------------------------------------------------------------------
export async function generateStaticParams() {
    const allPosts = await getAllPosts(); 
    return allPosts.map(p => ({ slug: p.slug }));
}


// -------------------------------------------------------------------
// ✅ 3. generateMetadata 
// -------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  // ต้องเป็น Promise 
  params: Promise<{ slug: string }>; 
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;              
  
  const allPosts = await getAllPosts(); 
  const p = allPosts.find(x => x.slug === slug);
  
  return {
    title: p ? `${p.title} | บทความ` : "บทความ",
    description: p?.excerpt ?? "บทความและคู่มืออุปกรณ์ช่าง",
    openGraph: p ? { images: [p.cover] } : undefined,
  };
}


// -------------------------------------------------------------------
// ✅ 4. BlogDetail Component (FINAL TYPE FIX)
// -------------------------------------------------------------------
// 💡 FIX: กำหนด params และ searchParams เป็น Promise ทั้งคู่
type BlogDetailProps = {
    params: Promise<{ slug: string }>; 
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogDetail(props: BlogDetailProps) {
  const { params } = props; // ดึงแค่ params ที่ต้องการใช้
  // Await ทั้ง params และ searchParams ก่อนใช้งาน
  const resolvedParams = await params;
  // const resolvedSearchParams = await searchParams; // searchParams ไม่ถูกใช้ แต่ถ้าใช้ก็ต้อง await
  const { slug } = resolvedParams;                 
  
  const allPosts = await getAllPosts(); 
  const p = allPosts.find(x => x.slug === slug);
  if (!p) return notFound();


  // mock เนื้อหา (ภายหลังค่อยดึงจาก CMS/MDX)
  /*
  const content: string[] = [
    "ยืนยันความต้องการลม (CFM) ของงาน เช่น พ่นสี, เปิดน๊อตลม, เป่าทำความสะอาด เพื่อเลือกปั๊มลมให้จ่ายลมพอโดยไม่ตก",
    "เลือกขนาดถังและแรงดันตัดต่อที่สมดุลกับ duty cycle ของมอเตอร์ เพื่อลดการทำงานต่อเนื่องเกินจำเป็น",
    "คำนึงถึงเสียงรบกวน, การบำรุงรักษา และพื้นที่ติดตั้ง โดยเฉพาะระบบระบายความร้อนและการระบายน้ำ",
  ];
  */
  const articleContent = p.excerpt;
  const related = allPosts.filter(x => x.slug !== p.slug).slice(0, 2);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-white">
      <nav className="text-sm text-gray-400">
        <Link href="/" className="hover:text-white">หน้าแรก</Link> <span className="mx-1">/</span>
        <Link href="/blog" className="hover:text-white">บทความ</Link> <span className="mx-1">/</span>
        <span className="text-gray-300">{p.title}</span>
      </nav>

      <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">{p.title}</h1>
      <div className="mt-1 text-sm text-gray-400">
        {new Date(p.date).toLocaleDateString("th-TH")} 
        {p.tag ? <> · <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">{p.tag}</span></> : null}
      </div>

      <div className="relative mt-4 aspect-[16/10] rounded-2xl overflow-hidden bg-[#1f1f1f] border border-gray-800">
        <Image src={p.cover} alt={p.title} fill className="object-cover" priority />
      </div>

      <article className="prose prose-invert prose-emerald mt-6 max-w-none">
       <div 
                 dangerouslySetInnerHTML={{ __html: articleContent }} 
             />
      </article>

      <div className="mt-8 flex gap-3">
        <a href="https://line.me/R/ti/p/@yourline" target="_blank"
           className="rounded-xl bg-orange-600 text-black font-semibold px-5 py-3 hover:bg-orange-500">สอบถามผ่าน LINE</a>
        <Link href="/products" className="rounded-xl border border-orange-400 text-orange-400 px-5 py-3 hover:bg-black/60">ดูสินค้าเกี่ยวข้อง</Link>
      </div>

      {/* บทความแนะนำ */}
      <section className="mt-10">
        <h2 className="text-lg font-bold">บทความที่เกี่ยวข้อง</h2>
        <div className="mt-3 grid sm:grid-cols-2 gap-4">
          {related.map(r => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="group rounded-xl overflow-hidden bg-[#1f1f1f] border border-gray-800 hover:border-orange-500 transition">
              <div className="relative aspect-[16/10]">
                <Image src={r.cover} alt={r.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString("th-TH")} </div>
                <div className="font-semibold text-white group-hover:text-orange-300 line-clamp-2">{r.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
