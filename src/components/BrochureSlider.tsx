
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
//import type { Image } from "sanity";


export type BrochureItem = {
  id: string | number;
  title: string;
  img: string;      // เส้นทางใน public เช่น "/brochures/promo1.webp"
  href?: string;    // ลิงก์ไป PDF/หน้าโปรฯ
  subtitle?: string;
  alt?: string;
};

export default function BrochureSlider({ items }: { items: BrochureItem[] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        // แสดงหลายภาพต่อหน้าจอ (2-3)
        slidesPerView={1.2}
        spaceBetween={12}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024:{ slidesPerView: 3, spaceBetween: 18 },
        }}
      >
        {items.map((b) => (
          <SwiperSlide key={b.id}>
            <Link href={b.href ?? "#"} target={b.href ? "_blank" : "_self"}>
              <div className="group rounded-2xl overflow-hidden bg-[#1f1f1f] border border-gray-800 hover:border-orange-500 hover:shadow-[0_0_0_1px_#f97316] transition">
                <div className="relative aspect-[12/10]">
                  <Image
                    src={b.img}
                    alt={b.alt ?? b.title}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover"
                    priority={false}
                  />
                  {/* ไล่เฉดทับให้อ่านชื่อภาพชัดขึ้น */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
                <div className="p-3">
                  <div className="text-sm text-white font-semibold line-clamp-1">{b.title}</div>
                  {b.subtitle && <div className="text-xs text-gray-400 line-clamp-1">{b.subtitle}</div>}
                  <div className="mt-1 text-xs text-orange-400">ดูรายละเอียด →</div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ปรับสีปุ่ม/จุด ให้เข้ากับธีมดำ–ส้ม */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev { color: #f97316; }
        .swiper-pagination-bullet { background: #9ca3af; opacity: .6; }
        .swiper-pagination-bullet-active { background: #f97316; opacity: 1; }
      `}</style>
    </div>
  );
}
