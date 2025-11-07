// components/ViewCounter.tsx
"use client"; // 💡 Mark as Client Component

import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // 1. เรียก API เพื่อเพิ่มจำนวนนับ (POST)
    const registerView = async () => {
      try {
        const res = await fetch("/api/views", { method: "POST" });
        const data = await res.json();
        // 2. อัปเดต state เพื่อแสดงผลทันที
        setCount(data.count); 
      } catch (error) {
        console.error("Error posting view:", error);
      }
    };

    registerView();
    // คุณอาจเรียก API GET เพื่อดึงจำนวนนับล่าสุดที่นี่ก่อน POST หากต้องการค่าตั้งต้นที่แน่นอน 
    // หรือใช้วิธีเรียก GET ใน Server Component และส่งค่าตั้งต้นมาให้ก็ได้
  }, []);

  // 3. ส่วนแสดงผล
    return (
    <div className="text-xs text-gray-400"> 
        <p>ยอดเข้าชม: **{count !== null ? count.toLocaleString() : "..."}**</p>
    </div>
    );
}