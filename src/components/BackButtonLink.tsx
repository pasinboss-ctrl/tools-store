'use client'; // ⬅️ ต้องมี

import Link from 'next/link';

type BackButtonLinkProps = {
    // รับค่า page จาก Server Component
    previousPage: string | string[] | undefined; 
}

export default function BackButtonLink({ previousPage }: BackButtonLinkProps) {
    
    // แปลงค่า page เป็น string ที่ใช้งานได้ (ป้องกัน string[])
    const pageValue = Array.isArray(previousPage) 
        ? previousPage[0] 
        : previousPage; 

    // สร้าง URL แบบ Dynamic
    const href = pageValue 
        ? `/products?page=${pageValue}` 
        : '/products'; // ถ้าไม่มีค่า page ให้กลับไปหน้าแรก

    return (
        <Link
            href={href} 
            className="inline-block rounded-xl border border-gray-700 px-5 py-3 hover:border-orange-500"
        >
            ← กลับไปหน้าสินค้า
        </Link>
    );
}