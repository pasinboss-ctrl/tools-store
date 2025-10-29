//import Image from "next/image";
import { notFound } from "next/navigation";
import { sanity } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { qProductBySlug, qProductSlugs } from "@/sanity/lib/queries";
import type { Image as SanityImage } from "sanity";
import Link from "next/link"; 
import ProductGallery from "@/components/ProductGallery";

export const revalidate = 60; // ISR 1 นาที

// ----------- Types ----------- //
type ProductDetail = {
  title: string;
  slug: string;
  price?: number;
  inStock?: boolean;
  category?: string;
  description?: string;
  thumbnail?: SanityImage;
  images?: SanityImage[];
};

type ProductPageProps = {
    // ✅ FIX 1: params ต้องเป็น Promise เพื่อผ่าน Type Check ใน async component
    params: Promise<{ slug: string }>;
    // ✅ FIX 2: searchParams ต้องเป็น Promise ด้วย แม้ไม่ได้ใช้ (เพื่อความชัวร์ในการ Build)
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
// ----------- Static Params ----------- //
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanity.fetch(qProductSlugs);
  return slugs.map((s) => ({ slug: s.slug }));
}

// ----------- Metadata (SEO) ----------- //
// Next 15: params เป็น Promise → ต้อง await เสมอ
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //const { slug } = params;
  //const p: ProductDetail | null = await sanity.fetch(qProductBySlug, { slug });
  const resolvedParams = await params; // ✅ FIX 4: await ก่อน Destructure
  const { slug } = resolvedParams;
  const p: ProductDetail | null = await sanity.fetch(qProductBySlug, { slug });

  const title = p ? `${p.title} | สินค้า` : "สินค้า";
  const description =
    p?.description?.slice(0, 120) ??
    "รายละเอียดสินค้า อุปกรณ์ช่าง และข้อมูลสเปกโดย High Pro";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: p?.thumbnail ? [{ url: urlFor(p.thumbnail).width(1200).height(630).url() }] : [],
    },
  };
}

// ----------- Page ----------- //
export default async function ProductDetailPage(props: ProductPageProps) { //  ใช้ ProductPageProps เป็น Type
  const { params } = props; // ดึงแค่ params ออกมาเพื่อเลี่ยง Warning 'searchParams' is defined but never used
    
  const resolvedParams = await params; // ✅ FIX 5: await ก่อน Destructure
  const { slug } = resolvedParams;

  const p: ProductDetail | null = await sanity.fetch(qProductBySlug, { slug });
  if (!p) return notFound();

    // ✅ แปลงภาพ Sanity object → URL string[] ที่ ProductGallery ต้องการ
  const galleryImages = (p.images ?? [])
    .filter((x: SanityImage | null): x is SanityImage => Boolean(x))
    .map((img) => urlFor(img).url());

  // fallback ถ้าไม่มีภาพ
  const finalImages = galleryImages.length ? galleryImages : ["/placeholder.jpg"];


  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* ✅ ส่ง URL string[] ตรงเข้า ProductGallery */}
        <ProductGallery images={finalImages} />

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{p.title}</h1>

            <div className="mt-2 text-gray-300">
              {/*{p.price != null ? `฿${p.price.toLocaleString()}` : "สอบถามราคา"}*/}
              <br>
              </br>
               <h2>รายละเอียดสินค้า</h2>
              {p.inStock === false && <span className="ml-2 text-red-400">หมดสต็อก</span>}
              {p.category && <span className="ml-3 text-sm text-gray-400">หมวด: {p.category}</span>}
            </div>

            {p.description && (
              <div className="mt-4 text-gray-300 space-y-3">
                {p.description.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <a
                href="https://line.me/R/ti/p/@highpro"
                target="_blank"
                className="inline-block rounded-xl bg-orange-500 text-black font-semibold px-5 py-3 hover:opacity-90"
              >
                สอบถาม/สั่งซื้อผ่าน LINE
              </a>
              <Link
                href="/products"
                className="inline-block rounded-xl border border-gray-700 px-5 py-3 hover:border-orange-500"
              >
                ← กลับไปหน้าสินค้า
              </Link>
            </div>
          </div>
        </div>

    </main>
  );
}
