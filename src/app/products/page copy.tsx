import ProductCard, { Product } from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

const allProducts: Product[] = [
  { slug: "lift-2post", name: "ลิฟต์ยกรถ 2 เสา รุ่น X", price: 120000, img: "/products/lift.png", badge: "HOT", category: "ลิฟต์ยกรถ" },
  { slug: "tire-changer", name: "เครื่องถอดยาง รุ่น C", price: 45000, img: "/products/tire-changer.png", category: "เครื่องถอดยาง" },
  { slug: "balancer", name: "เครื่องถ่วงล้อ รุ่น B", price: 38000, img: "/products/balancer.png", category: "เครื่องถ่วงล้อ" },
  { slug: "tool-set", name: "เครื่องมืออ รุ่น B", price: 38000, img: "/products/balancer.png", category: "ชุดเครื่องมือ" }
];

function filterProducts(q: string, cat: string) {
  return allProducts.filter(p =>
    (q ? p.name.toLowerCase().includes(q.toLowerCase()) : true) &&
    (cat ? p.category === cat : true)
  );
}


 export default function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; cat?: string; page?: string };
}) {
  const q = searchParams?.q ?? "";
  const cat = searchParams?.cat ?? "";
  const page = Math.max(1, parseInt(searchParams?.page ?? "1", 10) || 1);

  const pageSize = 12; // 👈 fixed
  const filtered = filterProducts(q, cat);
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const slice = filtered.slice(start, start + pageSize);

  const categories = Array.from(new Set(allProducts.map(p => p.category)));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-white">
      <h1 className="text-2xl md:text-3xl font-bold">สินค้า</h1>

      {/* Filter Bar (ไม่มี size แล้ว) */}
      <form className="mt-4 grid gap-3 md:grid-cols-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="ค้นหาสินค้า..."
          className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
        />
        <select
          name="cat"
          defaultValue={cat}
          className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
        >
          <option value="">ทุกหมวดหมู่</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="rounded-xl bg-orange-600 text-black font-semibold px-4 py-2 hover:bg-orange-500" type="submit">
          กรอง
        </button>
      </form>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {slice.map(p => <ProductCard key={p.slug} p={p} />)}
      </div>

      {/* Pagination */}
      <Pagination totalItems={total} pageSize={pageSize} currentPage={page} />
    </main>
  );
}
