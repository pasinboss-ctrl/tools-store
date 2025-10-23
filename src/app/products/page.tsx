// src/app/products/page.tsx
import Pagination from "@/components/Pagination";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { qProductsList } from "@/sanity/lib/queries";
import ProductCard, { Product } from "@/components/ProductCard";
import type { Image } from "sanity";

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = sp?.q?.toString() ?? "";
  const cat = sp?.cat?.toString() ?? "";
  const page = Math.max(1, parseInt(sp?.page ?? "1", 10) || 1);

  const pageSize = 12;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const qQuery = q ? `*${q}*` : "";   // ⬅️ ส่ง string เสมอ
  const catParam = cat || "";          // ⬅️ ส่ง string เสมอ

  const useCat = !!cat;   // true ถ้ามีการเลือกหมวด
  const useQ = !!q;       // true ถ้ามีการค้นหา

  console.log("GROQ qProductsList >>>\n", qProductsList);
  console.log("GROQ params >>>", { qQuery, cat: catParam,useCat,useQ, start, end }); // ⬅️ ใช้ catParam

  const data: {
    items: { title: string; slug: string; price?: number; category?: string; thumbnail?: Image }[];
    total: number;
    categories: (string | null)[];
  } = await sanity.fetch(qProductsList, { qQuery, cat: catParam,useCat,useQ, start, end });

  const slice: Product[] = data.items.map((p) => ({
    slug: p.slug,
    name: p.title,
    price: p.price,
    category: p.category ?? "",
    img: p.thumbnail ? urlFor(p.thumbnail).width(850).height(1000).url() : "/placeholder.jpg",
  }));

  const categories = (data.categories || []).filter((c): c is string => !!c);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-white">
      <h1 className="text-2xl md:text-3xl font-bold">สินค้า</h1>

      <form className="mt-4 grid gap-3 md:grid-cols-3">
        <input name="q" defaultValue={q} placeholder="ค้นหาสินค้า..." className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500" />
        <select name="cat" defaultValue={cat} className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500">
          <option value="">ทุกหมวดหมู่</option>
          {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
        <button className="rounded-xl bg-orange-600 text-black font-semibold px-4 py-2 hover:bg-orange-500" type="submit">ค้นหา</button>
      </form>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {slice.map((p) => (<ProductCard key={p.slug} p={p} />))}
      </div>

      <Pagination totalItems={data.total} pageSize={12} currentPage={page} />
    </main>
  );
}
