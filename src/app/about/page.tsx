import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "HIGH PRO  โซลูชันอุปกรณ์ช่างและอุปกรณ์อู่ ครบ จบ ในที่เดียว พร้อมทีมผู้เชี่ยวชาญแนะนำการเลือกใช้งาน",
};

const stats = [
  { k: "10+", v: "ปีประสบการณ์" },
  { k: "3,500+", v: "ลูกค้าธุรกิจ" },
  { k: "40+", v: "รุ่นสินค้า" },
  { k: "20+", v: "พันธมิตรแบรนด์" },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-800">
        <div className="absolute inset-0">
          <Image src="/hero/about-hero.png" alt="HIGH PRO Garage" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">High Pro Tools</h1>
          <p className="mt-3 text-gray-200 max-w-2xl mx-auto">
            ผู้จัดจำหน่ายเครื่องมือช่างยนต์ครบวงจร ไม่ว่าจะเป็น ลิฟท์ยกรถยนต์ ลิฟท์มอเตอร์ไซค์ เครื่องถอดยาง เครื่องถ่วงล้อ เครื่องตั้งศูนย์ล้อ ไปจนถึงอุปกรณ์สำหรับอู่ซ่อมสีและตัวถัง
          </p>
          <div className="mt-6">
            <Link href="/products" className="rounded-xl bg-orange-600 text-black font-semibold px-6 py-3 hover:bg-orange-500">
              ดูสินค้า
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-2xl bg-[#1f1f1f] border border-gray-800 p-5 text-center">
            <div className="text-2xl font-extrabold text-orange-400">{s.k}</div>
            <div className="mt-1 text-gray-300">{s.v}</div>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="mt-10 grid md:grid-cols-2 gap-6 items-center">
        <div className="rounded-2xl bg-[#1f1f1f] border border-gray-800 p-6">
          <h2 className="text-xl font-bold">เป้าหมายของเรา</h2>
          <p className="mt-2 text-gray-300">
            เราพร้อมให้คำปรึกษาทั้ง อู่ขนาดเล็กจนถึงอู่ขนาดใหญ่ โดยทีมช่างผู้เชี่ยวชาญที่มีประสบการณ์จริงในวงการเครื่องมือช่างยนต์ พร้อมบริการ จัดส่งและติดตั้งทั่วประเทศ
          </p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <p>มั่นใจในคุณภาพทุกชิ้น ด้วย มาตรฐานการผลิตระดับสากล และรับประกันสินค้านานกว่า 1 ปี
            เพราะเรามุ่งมั่นที่จะเป็น พาร์ทเนอร์ที่ดีที่สุดสำหรับทุกอู่ซ่อมรถยนต์ในประเทศไทย
            </p>
          </ul>
        </div>
        <div className="relative h-64 md:h-full min-h-64 rounded-2xl overflow-hidden border border-gray-800">
          <Image src="/content/saleman.png" alt="Our mission" fill className="object-cover" />
        </div>
      </section>

      {/* Timeline / Why us */}
      <section className="mt-10 grid md:grid-cols-3 gap-6">
        {[
          { t: "เชี่ยวชาญจริง", d: "ทีมงานภาคสนามและช่างเทคนิคพร้อมแนะนำการใช้งานจริง" },
          { t: "ของแท้ มีประกัน", d: "รับประกันสินค้า พร้อมบริการหลังการขาย และอะไหล่" },
          { t: "คุ้มค่า", d: "สเปกเหมาะสมกับงาน ลดต้นทุนระยะยาว" },
        ].map((b) => (
          <div key={b.t} className="rounded-2xl bg-[#1f1f1f] border border-gray-800 p-6">
            <div className="text-lg font-semibold">{b.t}</div>
            <div className="mt-1 text-gray-300">{b.d}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl border border-orange-500/40 bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-black flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xl font-extrabold">อยากเริ่มต้นจัดอุปกรณ์อู่ให้ครบ?</div>
          <div>ส่งรายการ หรือคุยกับผู้เชี่ยวชาญได้เลย</div>
        </div>
        <div className="flex gap-3">
          <a href="https://line.me/R/ti/p/@highpro" target="_blank" className="rounded-xl bg-black text-orange-400 px-5 py-3 font-semibold hover:bg-gray-900">
            ทัก LINE
          </a>
          <Link href="/contact" className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:opacity-90">
            ติดต่อเรา
          </Link>
        </div>
      </section>

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        className="sr-only"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HIGH PRO Tools",
            url: "https://your-domain.com",
            logo: "https://your-domain.com/icons/high-pro.png",
            sameAs: [
              "https://www.facebook.com/highprotools"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+66-6-4962-6224",
              contactType: "customer support",
              areaServed: "TH",
              availableLanguage: ["Thai", "English"],
            },
          }),
        }}
      />
    </main>
  );
}
