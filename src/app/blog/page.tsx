import PostCard, { type Post } from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { qContentList } from "@/sanity/lib/queries";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image"; 
import type { Image as SanityImage } from "sanity"; 

export const revalidate = 60;

type ContentData= {
  id:number ; 
  title: string; 
  "slug": string; 
  tag: string;
  desc: string;
  fulldesc : string;
  banner?: SanityImage;
  date: string;
};


/*const rawContent = await sanity.fetch<ContentData[]>(qContentList);

const allPosts: Post[] = rawContent
    .filter(p => p.banner) // กรองเฉพาะรายการที่มีรูปภาพ
    .map((p) => ({
        slug: p.slug,
        title: p.title,
        // Assumption: PostCard component uses 'excerpt' for the short description, 
        // so we map 'fulldesc' (หรือ p.desc หากคุณต้องการข้อความสั้น) ไปยัง 'excerpt'
        excerpt: p.fulldesc, 
        tag: p.tag,
        cover: urlFor(p.banner!).url(), 
        date : p.date,
        // 👇 เพิ่ม property 'read' เข้าไป เพื่อให้ตรงตาม Post type
        //read: "3 นาที", // ใช้ค่า default หรือหาทางคำนวณเวลาอ่านจริง
    }));

console.log("GROQ qContentListpage >>>\n", qContentList);
console.log("slug URL ที่ถูกสร้าง:", allPosts[0]?.slug);    
*/
/*
const allPosts: Post[] = [
  {
    slug: "air-compressor-checklist",
    title: "5 เช็กลิสต์ก่อนซื้อปั๊มลม",
    excerpt: "เลือกขนาดถัง กำลังมอเตอร์ และค่า CFM ให้เหมาะกับงานจริง ลดปัญหาแรงลมตกและเสียงดัง",
    cover: "/content/air-compressor-checklist.jpg",
    tag: "CHECKLIST",
    read: "2 นาที",
    date: "2025-09-01",
  },
  {
    slug: "engine-oil-grade",
    title: "เกรดน้ำมันเครื่อง เลือกยังไงให้เหมาะ",
    excerpt: "เข้าใจตัวเลขความหนืด SAE และมาตรฐาน API เพื่อการปกป้องชิ้นส่วนเครื่องยนต์ที่ดีกว่า",
    cover: "/content/engine-oil-grade.jpg",
    tag: "TIPS",
    read: "4 นาที",
    date: "2025-08-20",
  },
  {
    slug: "drill-selection-guide",
    title: "คู่มือเลือกสว่าน: ไร้สาย vs สายไฟ",
    excerpt: "เทียบแรงบิด แบตเตอรี่ ความทนทาน และความคุ้มค่า สำหรับงานช่างทั่วไปถึงมืออาชีพ",
    cover: "/content/drill-selection-guide.jpg",
    tag: "GUIDE",
    read: "3 นาที",
    date: "2025-08-05",
  },
];
*/
function filterPosts(q: string, tag: string, posts: Post[]): Post[] { // 👈 รับ Array เข้ามา
 return posts.filter(p =>
  (q ? (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()) : true) &&
  (tag ? (p.tag ?? "").toLowerCase() === tag.toLowerCase() : true)
 );
}


export default async function BlogIndex({ 
    searchParams 
}: { 
    //searchParams: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }> // Type อาจจะเป็น Promise ใน Next.js 15
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // ต้อง await ก่อนเพื่อเข้าถึงข้อมูลภายใน
    const resolvedSearchParams = await searchParams; // <--- **บรรทัดสำคัญ**

    // จากนั้นใช้ resolvedSearchParams แทน
    // แก้ไขการดึง q และ tag ให้ถูกต้องตาม Type
    const q = (Array.isArray(resolvedSearchParams?.q) ? resolvedSearchParams.q[0] : resolvedSearchParams?.q) ?? "";
    const tag = (Array.isArray(resolvedSearchParams?.tag) ? resolvedSearchParams.tag[0] : resolvedSearchParams?.tag) ?? "";
    
    // บรรทัดที่คุณมีปัญหา:
    const page = Math.max(
        1, 
        parseInt(resolvedSearchParams?.page?.toString() ?? "1", 10) || 1
    );

  const pageSize = 9; // 👈 fixed

  // 2. 💡 ย้ายตรรกะการดึงข้อมูลและการแปลงมาไว้ตรงนี้
    const rawContent = await sanity.fetch<ContentData[]>(qContentList); // 👈 await การดึงข้อมูล
    
    // 💡 3. กำหนด allPosts เป็นตัวแปรภายใน (Local Variable)
    const allPosts: Post[] = rawContent
        .filter(p => p.banner) 
        .map((p) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.fulldesc, 
            tag: p.tag,
            cover: urlFor(p.banner!).url(), 
            date : p.date,
        }));
    
    // 4. เรียกใช้ filterPosts โดยส่ง allPosts เข้าไป

  const filtered = filterPosts(q, tag, allPosts); 
  //const filtered = filterPosts(q, tag);
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const slice = filtered.slice(start, start + pageSize);

  //const tags = Array.from(new Set(allPosts.map(p => p.tag).filter(Boolean))) as string[];
  const tags = Array.from(new Set(allPosts.map(p => p.tag).filter(Boolean))) as string[];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-white">
      <h1 className="text-2xl md:text-3xl font-bold">บทความ</h1>

    
      <form className="mt-4 grid gap-3 md:grid-cols-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="ค้นหาบทความ..."
          className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
        />
        <select
          name="tag"
          defaultValue={tag}
          className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
        >
          <option value="">ทุกหัวข้อ</option>
          {tags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button className="rounded-xl bg-orange-600 text-black font-semibold px-4 py-2 hover:bg-orange-500" type="submit">
          ค้นหา
        </button>
      </form>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {slice.map(p => <PostCard key={p.slug} p={p} />)}
      </div>

      {/* Pagination */}
      <Pagination totalItems={total} pageSize={pageSize} currentPage={page} />
    </main>
  );
}
