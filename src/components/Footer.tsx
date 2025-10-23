import Link from 'next/link';

export default function Footer() {
    return (
      <footer className="mt-16 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-8 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-semibold">High Pro Equipment Co.,Ltd.</div>
            <div className="text-slate-500 mt-1">ผู้จัดจำหน่ายเครื่องมือช่างยนต์ครบวงจร ไม่ว่าจะเป็น ลิฟท์ยกรถยนต์ ลิฟท์มอเตอร์ไซค์ เครื่องถอดยาง เครื่องถ่วงล้อ เครื่องตั้งศูนย์ล้อ ไปจนถึงอุปกรณ์สำหรับอู่ซ่อมสีและตัวถัง</div>
          </div>
          <div>
            <div className="font-semibold">ติดต่อ</div>
            <ul className="text-slate-600 mt-2 space-y-1">
              <li>LINE: @highpro</li>
              <li>โทร: 064-962-6224</li>
              <li>ที่อยู่: 59/134 หมู่ 5 ตำบล ละหาร อำเภอ บางบัวทอง จังหวัด นนทบุรี 11110</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">ลิงก์</div>
            <ul className="text-slate-600 mt-2 space-y-1">
             <li>
                <Link href="/products" className="hover:underline">
                  สินค้า
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  บทความ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 py-4">© 2025 High Pro Equipment Co.,Ltd.</div>
      </footer>
    );
  }
  