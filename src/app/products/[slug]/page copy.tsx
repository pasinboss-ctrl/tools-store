import { notFound } from "next/navigation";
import type { Product } from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";

const allProducts: Product[] = [
  {
    slug: "lift-2post",
    name: "ลิฟต์ยกรถ 2 เสา รุ่น X",
    price: 120000,
    img: "/products/lift-1.png",
    images: ["/products/lift-1.png", "/products/lift-2.png", "/products/lift-3.png"],
    badge: "HOT",
    category: "ลิฟต์ยกรถ",
  },
  {
    slug: "tire-changer",
    name: "เครื่องถอดยาง รุ่น C",
    price: 45000,
    img: "/products/tire-1.jpg",
    images: ["/products/tire-1.jpg", "/products/tire-2.jpg", "/products/tire-3.jpg"],
    category: "เครื่องถอดยาง",
  },
  {
    slug: "tire-changer",
    name: "เครื่องถอดยาง รุ่น C",
    price: 45000,
    img: "/products/tire-1.jpg",
    images: ["/products/tire-1.jpg", "/products/tire-2.jpg", "/products/tire-3.jpg"],
    category: "เครื่องถอดยาง",
  }
];


export default function ProductDetail({ params }: { params: { slug: string } }) {

  const p = allProducts.find(x => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* ใช้แกลเลอรีแทนรูปเดียว */}
        <ProductGallery images={p.images?.length ? p.images : [p.img]} />

        {/* ฝั่งรายละเอียด (เดิม) */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{p.name}</h1>
          <div className="mt-2 text-orange-400 text-xl font-bold">
            {p.price ? `฿${p.price.toLocaleString()}` : "ติดต่อสอบถามราคา"}
          </div>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>• สเปกหลัก/คุณสมบัติเด่น 1</li>
            <li>• สเปกหลัก/คุณสมบัติเด่น 2</li>
            <li>• สเปกหลัก/คุณสมบัติเด่น 3</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="https://line.me/R/ti/p/@yourline" target="_blank"
               className="rounded-xl bg-orange-600 text-black font-semibold px-5 py-3 hover:bg-orange-500">ทัก LINE</a>
            <a href="/brochures/lift-x.pdf" target="_blank"
               className="rounded-xl border border-orange-400 text-orange-400 px-5 py-3 hover:bg-black/60">ดาวน์โหลดโบรชัวร์</a>
          </div>
        </div>
      </div>
    </main>
  );
}
