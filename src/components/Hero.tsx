"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

   // ตรวจขนาดจอ
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // เรียกตอน mount ครั้งแรก
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const heroImg = isMobile ? "/hero/Banner-mobile.jpg" : "/hero/Banner.jpg";

  return (
    <section className="relative h-[60vh] min-h-[540px] w-full overflow-hidden bg-black">
      {/* BG image + Ken Burns */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0"
        >
          <Image
            src={heroImg}
            alt="HIGH PRO — Total Garage Solutions"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/55" />
      </div>


      {/* Neon frame (orange glow) */}
      <div className="pointer-events-none absolute inset-6 md:inset-10 rounded-[24px] ring-2 ring-orange-500/70" />
      <div className="pointer-events-none absolute inset-6 md:inset-10 rounded-[24px] shadow-[0_0_80px_20px_#f97316] opacity-40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Logo chip (optional,ลบได้) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-black/30 px-3 py-1 text-xs text-orange-300"
        >
          <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" />
          HIGH PRO • PRO EQUIPMENT
        </motion.div>

        {/* Headline + Sub */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold tracking-wide 
                    bg-gradient-to-b from-amber-300 via-orange-500 to-orange-700 
                    text-transparent bg-clip-text drop-shadow-[2px_3px_0px_rgba(0,0,0,0.7)]"
        >
          HIGH PRO EQUIPMENT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="mt-2 text-lg md:text-xl font-semibold text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
        >
          ผู้จัดจำหน่ายเครื่องมือช่างยนต์ทุกชนิด
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="mt-6 flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/products"
            className="relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                       bg-orange-600 text-black shadow-lg shadow-orange-600/40 hover:bg-orange-500
                       transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            {/* subtle pulse aura */}
            <span className="pointer-events-none absolute inset-0 rounded-xl blur-md opacity-0
                              group-[&]:opacity-0" />
            ดูสินค้า
          </Link>

          <Link
            href="https://line.me/R/ti/p/@highpro"
            target="_blank"
            className="relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                       border border-orange-400 text-orange-400 bg-black/40 hover:bg-black/60
                       transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <span className="absolute -z-10 inset-0 rounded-xl shadow-[0_0_30px_6px_#f97316] opacity-20
                              hover:opacity-40 transition" />
            ทัก LINE
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="absolute bottom-5 flex flex-col items-center text-orange-300/90"
        >
          <div className="text-xs tracking-wide">SCROLL</div>
          <div className="mt-1 h-6 w-px bg-gradient-to-b from-orange-400 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
