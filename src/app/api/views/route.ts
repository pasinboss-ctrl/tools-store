// src/app/api/views/route.ts
import { createClient } from "redis";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// 💡 สร้างฟังก์ชันเชื่อมต่อเพื่อเรียกใช้เมื่อจำเป็น (Lazy Connection)
async function getRedisClient() {
  const client = createClient({ url: process.env.REDIS_URL });
  // ตรวจสอบว่า REDIS_URL ถูกตั้งค่าแล้ว
  if (!process.env.REDIS_URL) {
      throw new Error("REDIS_URL is not defined in environment variables.");
  }
  await client.connect();
  return client;
}

// 💡 POST Method: สำหรับเพิ่มจำนวนนับ
export async function POST(request: NextRequest) {
  let redisClient;
  try {
    redisClient = await getRedisClient();
    
    // ใช้อิโมจิ 🔑 เพื่อเน้นความสำคัญของรหัส
    // INCRBY เป็นคำสั่งที่ปลอดภัยในการเพิ่มค่า
    const newCount = await redisClient.incr("page_views"); // 🔑 ใช้ Key ชื่อ page_views
    
    await redisClient.disconnect(); // ตัดการเชื่อมต่อเมื่อเสร็จสิ้น
    
    return NextResponse.json({ count: newCount }, { status: 200 });
  } catch (error) {
    console.error("Failed to increment view count:", error);
    if (redisClient) {
        await redisClient.disconnect().catch(err => console.error("Failed to disconnect redis:", err));
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// 💡 (ทางเลือก) GET Method: สำหรับดึงจำนวนนับปัจจุบัน
export async function GET() {
    let redisClient;
    try {
        redisClient = await getRedisClient();
        const count = await redisClient.get("page_views");
        
        await redisClient.disconnect();
        
        return NextResponse.json({ count: count ? parseInt(count) : 0 }, { status: 200 });
    } catch (error) {
        console.error("Failed to get view count:", error);
        if (redisClient) {
            await redisClient.disconnect().catch(err => console.error("Failed to disconnect redis:", err));
        }
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
  let redisClient;
  try {
    redisClient = await getRedisClient();
    
    // 🔑 ใช้คำสั่ง .del() เพื่อลบคีย์ "page_views"
    // ค่าที่คืนมา (deletedCount) จะเป็น 1 ถ้าลบได้, เป็น 0 ถ้าไม่พบคีย์
    const deletedCount = await redisClient.del("page_views"); 
    
    await redisClient.disconnect(); 
    
    return NextResponse.json({ 
        message: "Counter cleared successfully", 
        deletedKeys: deletedCount 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Failed to clear view count:", error);
    if (redisClient) {
        await redisClient.disconnect().catch(err => console.error("Failed to disconnect redis:", err));
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}