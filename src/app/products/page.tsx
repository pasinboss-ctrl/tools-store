// src/app/products/page.tsx
import Pagination from "@/components/Pagination";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { qProductsList } from "@/sanity/lib/queries";
import ProductCard, { Product } from "@/components/ProductCard";
import type { Image } from "sanity";
import FilterBar from "@/components/FilterBar";

export const revalidate = 15;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = sp?.q?.toString() ?? "";
  const cat = sp?.cat?.toString() ?? "";
  const page = Math.max(1, parseInt(sp?.page ?? "1", 10) || 1);

  //const pageSize = 12;
  //const start = (page - 1) * pageSize;
  //const end = start + pageSize;

  //const qQuery = q ? `*${q}*` : "";   // ⬅️ ส่ง string เสมอ
  const qQuery = q ? `${q}*` : "";
  const catParam = cat || "";          // ⬅️ ส่ง string เสมอ

  console.log (qQuery)
  console.log (catParam)

  const useCat = !!cat;   // true ถ้ามีการเลือกหมวด
  const useQ = !!q;       // true ถ้ามีการค้นหา

  console.log("GROQ qProductsList >>>\n", qProductsList);
  console.log("GROQ params >>>", { qQuery, cat: catParam,useCat,useQ}); // ⬅️ ใช้ catParam

  const data: {
    items: { title: string; slug: string; price?: number; category?: string; thumbnail?: Image,inStock:boolean }[];
    total: number;
    categories: (string | null)[];
  } = await sanity.fetch(qProductsList, { qQuery, cat: catParam,useCat,useQ});

  //console.log(data)


  let slice: Product[] = data.items.map((p) => ({
    slug: p.slug,
    name: p.title,
    price: p.price,
    category: p.category ?? "",
    img: p.thumbnail ? urlFor(p.thumbnail).width(850).height(1000).url() : "/placeholder.jpg",
    active : p.inStock,
  }));

  // 1️⃣ กรองข้อมูล (ฝั่ง client)
let filtered = slice;
if (q) {
  const qLower = q.trim().toLowerCase().replace(/\s/g, "");
  filtered = slice.filter((p) =>
    p.name?.toLowerCase().replace(/\s/g, "").includes(qLower)
  );
}

// 2️⃣ คำนวณจำนวนทั้งหมดหลังกรอง
const total = filtered.length;

// 3️⃣ คำนวณ pagination (start / end เหมือนเดิม)
const pageSize = 12;
const start = (page - 1) * pageSize;
const end = start + pageSize;

// 4️⃣ ตัดเฉพาะสินค้าที่อยู่ในหน้าปัจจุบัน
const paginated = filtered.slice(start, end);

  if (q) {
  const qLower = q.trim().toLowerCase();
  slice = slice.filter((p) =>
    p.name?.toLowerCase().includes(qLower)
  );
}

  const categories = (data.categories || []).filter((c): c is string => !!c);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-white">
      <h1 className="text-2xl md:text-3xl font-bold">
        {q ? `ผลการค้นหา: ${q}` : "สินค้า"}
      </h1>

      <FilterBar categories={categories} defaultCat={cat} defaultQ={q} />

      {paginated.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginated.map((p) => (
            <ProductCard key={p.slug} p={p} currentPage={page.toString()} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-gray-400">
          ไม่พบสินค้าที่ตรงกับคำค้น
        </p>
      )}

      <Pagination totalItems={total} pageSize={pageSize} currentPage={page} />
    </main>
  );
}
