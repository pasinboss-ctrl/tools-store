"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  const pics = images?.length ? images : ["/products/placeholder.jpg"];
  const [current, setCurrent] = useState(0);

  return (
    <div>
      {/* รูปหลัก */}
      <div className="relative aspect-square rounded-2xl bg-[#1f1f1f] border border-gray-800">
        <Image
          src={pics[current]}
          alt={`product-image-${current + 1}`}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-contain p-6"
          priority
        />
      </div>

      {/* แถว thumbnails (สูงสุด 3 รูป) */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {pics.slice(0, 3).map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={[
              "relative aspect-square rounded-xl overflow-hidden border transition",
              current === i
                ? "border-orange-500 ring-1 ring-orange-500"
                : "border-gray-800 hover:border-orange-500/60",
            ].join(" ")}
            aria-label={`เปลี่ยนเป็นรูปที่ ${i + 1}`}
          >
            <Image src={src} alt={`thumb-${i + 1}`} fill className="object-contain p-2 bg-[#151515]" />
          </button>
        ))}
      </div>
    </div>
  );
}
