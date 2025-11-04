'use client'; 

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react'; 

interface FilterBarBlogProps {
    tags: string[];
    defaultTag: string; 
    defaultQ: string;
}

export default function FilterBarBlog({ tags, defaultTag, defaultQ }: FilterBarBlogProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition(); 

    // ดึงค่าปัจจุบันจาก URL สำหรับควบคุม <select> และ <input>
    // ถ้าไม่มีใน URL ให้ใช้ค่า default ที่ส่งมาจาก Server Component
    const currentTag = searchParams.get('tag') ?? defaultTag;
    const currentQ = searchParams.get('q') ?? defaultQ;

    // 💡 ฟังก์ชันจัดการการเปลี่ยนแปลงค่า Select
    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newTag = event.target.value;
        const newSearchParams = new URLSearchParams(searchParams.toString());
        
        if (newTag) {
            newSearchParams.set('tag', newTag);
        } else {
            newSearchParams.delete('tag'); // ลบ 'tag' ออกจาก URL ถ้าเลือก 'ทุกหัวข้อ'
        }
        

        newSearchParams.set('page', '1'); 
        
        const newUrl = `${pathname}?${newSearchParams.toString()}`;

        startTransition(() => {
            // ใช้วิธีนี้เพื่ออัปเดต URL โดยไม่ทำให้หน้าเว็บโหลดใหม่ทั้งหมด
            router.push(newUrl); 
        });
    };

    // 💡 ฟังก์ชันจัดการการค้นหา (Search) - ใช้ onSubmit บน Form
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newQ = formData.get('q') as string;

        const newSearchParams = new URLSearchParams(searchParams.toString());
        
        if (newQ.trim()) {
            newSearchParams.set('q', newQ.trim());
        } else {
            newSearchParams.delete('q');
        }

        
        newSearchParams.set('page', '1'); 

        const newUrl = `${pathname}?${newSearchParams.toString()}`;

        startTransition(() => {
            router.push(newUrl);
        });
    };


    return (
        <form onSubmit={handleSearchSubmit} className="mt-4 grid gap-3 md:grid-cols-3">
            <input
                name="q"
                defaultValue={currentQ}
                placeholder="ค้นหาบทความ..."
                className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
                // คุณสามารถเพิ่ม onChange เพื่อให้ค้นหาแบบ Real-time ได้ (ต้องมีการ Debounce)
                // แต่การใช้ onSubmit กับปุ่ม 'ค้นหา' ก็ใช้ได้เช่นกัน
            />
            <select
                name="tag"
                value={currentTag} // 👈 ควบคุมค่าด้วย State/Query Parameter
                onChange={handleTagChange} // 👈 เมื่อค่าเปลี่ยนจะเรียกฟังก์ชันอัปเดต URL
                className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
                disabled={isPending} // ปิดการใช้งานชั่วคราวระหว่างรอการอัปเดต
            >
                <option value="">ทุกหัวข้อ</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <button 
                className="rounded-xl bg-orange-600 text-black font-semibold px-4 py-2 hover:bg-orange-500" 
                type="submit"
                disabled={isPending} // ปิดการใช้งานชั่วคราวระหว่างรอการอัปเดต
            >
                {isPending ? 'กำลังค้นหา...' : 'ค้นหา'}
            </button>
        </form>
    );
}