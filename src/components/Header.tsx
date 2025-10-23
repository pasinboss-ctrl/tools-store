// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // กันหน้าจอเลื่อนเวลารายการเมนูมือถือเปิด
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const NavLinks = () => (
    <>
      <Link href="/" className="hover:text-orange-400" onClick={close}>หน้าแรก</Link>
      <Link href="/products" className="hover:text-orange-400" onClick={close}>สินค้า</Link>
      <Link href="/promo" className="hover:text-orange-400" onClick={close}>โปรโมชั่น</Link>
      <Link href="/blog" className="hover:text-orange-400" onClick={close}>บทความ</Link>
      <Link 
        href="/doc/catalog_High_Pro_2025.pdf" // 👈 **เปลี่ยนเป็น Path ของไฟล์ PDF ของคุณ**
        className="hover:text-orange-400" 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={close} 
      >
        แคตตาล็อก
      </Link>
      <Link href="/about" className="hover:text-orange-400" onClick={close}>เกี่ยวกับเรา</Link>
      <Link href="/contact" className="hover:text-orange-400" onClick={close}>ติดต่อเรา</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-black border-b border-orange-500/50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo.png"
              alt="HP High Pro Equipment Co.,Ltd. Logo"
              width={70}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <span className="font-semibold">High Pro Equipment Co.,Ltd.</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <NavLinks />
        </nav>

        {/* Desktop CTA */}
        <a
          href="https://line.me/R/ti/p/@highpro"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center rounded bg-orange-500 px-3 py-1.5 text-black font-semibold hover:bg-orange-400"
        >
          ทัก LINE
        </a>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-200 hover:border-orange-500 hover:text-orange-400"
          aria-label="เปิดเมนู"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          {/* icon burger */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-white">เมนู</span>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-200 hover:border-orange-500 hover:text-orange-400"
              aria-label="ปิดเมนู"
              onClick={close}
            >
              {/* icon close */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <div className="mt-2 grid gap-3 text-lg text-gray-200">
              <NavLinks />
            </div>

            <a
              href="https://line.me/R/ti/p/@yourline"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-xl bg-orange-600 px-5 py-3 font-semibold text-black hover:bg-orange-500"
              onClick={close}
            >
              ทัก LINE
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
