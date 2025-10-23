"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function cn(...a: (string | false | null | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

function buildHref(pathname: string, sp: URLSearchParams, page: number) {
  const next = new URLSearchParams(sp);
  if (page <= 1) next.delete("page");
  else next.set("page", String(page));
  return `${pathname}?${next.toString()}`;
}

function windowPages(current: number, total: number, windowSize = 5): number[] {
  if (total <= windowSize) return Array.from({ length: total }, (_, i) => i + 1);
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + windowSize - 1);
  if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
}: {
  totalItems: number;
  pageSize: number;
  currentPage: number;
}) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages = windowPages(currentPage, totalPages, 5);

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="หน้า" className="mt-8 flex items-center justify-center gap-2">
      {/* Prev */}
      <Link
        href={buildHref(pathname, sp, Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={cn(
          "px-3 py-2 rounded-lg border text-sm",
          currentPage === 1
            ? "border-gray-700 text-gray-500 cursor-not-allowed"
            : "border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black transition"
        )}
      >
        ก่อนหน้า
      </Link>

      {/* leading ellipsis */}
      {pages[0] > 1 && (
        <>
          <Link
            href={buildHref(pathname, sp, 1)}
            className="px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-400 transition text-sm"
          >
            1
          </Link>
          <span className="px-2 text-gray-500">…</span>
        </>
      )}

      {/* numeric pages */}
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(pathname, sp, p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={cn(
            "px-3 py-2 rounded-lg border text-sm",
            p === currentPage
              ? "border-orange-500 bg-orange-600 text-black"
              : "border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-400 transition"
          )}
        >
          {p}
        </Link>
      ))}

      {/* trailing ellipsis */}
      {pages[pages.length - 1] < totalPages && (
        <>
          <span className="px-2 text-gray-500">…</span>
          <Link
            href={buildHref(pathname, sp, totalPages)}
            className="px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-orange-500 hover:text-orange-400 transition text-sm"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next */}
      <Link
        href={buildHref(pathname, sp, Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "px-3 py-2 rounded-lg border text-sm",
          currentPage === totalPages
            ? "border-gray-700 text-gray-500 cursor-not-allowed"
            : "border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black transition"
        )}
      >
        ถัดไป
      </Link>
    </nav>
  );
}
