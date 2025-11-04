import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;

export type Product = {
  slug: string;
  name: string;
  price?: number;
  img: string;         // ใช้เป็นรูปหลักได้
  images?: string[];   // ← เพิ่มอาร์เรย์รูปย่อย/รูปทั้งหมด (รวมรูปหลักด้วยก็ได้)
  badge?: string;
  category: string;
  active : boolean;
};

type ProductCardProps = {
    p: Product;
    // currentPage
    currentPage?: string | string[] | undefined; 
};

export default function ProductCard({ p, currentPage }: ProductCardProps) {
  
    // จัดการค่า currentPage ให้อยู่ในรูปแบบ string (ป้องกัน string[] หรือ undefined)
    const pageValue = currentPage 
        ? (Array.isArray(currentPage) ? currentPage[0] : currentPage)
        : null;
        
    // 4. สร้าง Query String
    const pageQueryString = pageValue ? `?page=${pageValue}` : '';

    // 5. สร้างลิงก์แบบมี Query String
    const productLink = `/products/${p.slug}${pageQueryString}`;

  return (
    <div className="group rounded-2xl bg-[#1f1f1f] border border-gray-800 hover:border-orange-500 transition overflow-hidden">
      <Link href={productLink}>
        <div className="relative aspect-square">
          <Image src={p.img} alt={p.name} fill className="object-contain p-4" sizes="(min-width:1024px) 25vw, 50vw" />
          {p.badge && (
            <span className="absolute left-3 top-3 text-xs px-2 py-0.5 rounded bg-orange-500 text-black font-semibold">
              {p.badge}
            </span>
          )}
          {/* วงกลมสีแดง "สินค้าหมด" ถ้า isActive เป็น false */}
          {!p.active && (
            <div className="absolute inset-0 flex items-center justify-center"> {/* Overlay สีดำจางๆ */}
              <span className="w-20 h-20 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                สินค้าหมด
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-white font-semibold line-clamp-2 h-14">
            {p.name}
          </div>
          <div className="mt-1 text-sm text-gray-400">{p.category}</div>
          <div className="mt-2 font-bold">
          <div className="mt-2 font-bold">
            {/* กำหนดคลาสสีตามค่าของ p.active */}
            <div className={p.active ? "text-orange-400" : "text-red-600"}>
              {p.active ? "มีสินค้า" : "สินค้าหมด"}
            </div>
          </div>
</div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <a
          href="https://line.me/R/ti/p/@highpro"
          target="_blank"
          className="inline-flex items-center justify-center w-full rounded-xl border border-orange-500 text-orange-400 px-3 py-2 hover:bg-orange-500 hover:text-black transition"
        >
          ติดต่อสอบถาม
        </a>
      </div>
    </div>
  );
}
