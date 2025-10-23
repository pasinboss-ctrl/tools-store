
// deleteContent.mjs
import { createClient } from '@sanity/client';

// กำหนดค่า Sanity Client ของคุณ
const client = createClient({
  projectId: '6g9o8ej4',   // <<--- เปลี่ยนเป็น Project ID ของคุณ
  dataset: 'production',   // <<--- เปลี่ยนเป็น Dataset Name ของคุณ (เช่น 'production' หรือ 'development')
  token: 'sklH8I96za3pwhijKKl7ir2vZur5pdeNSc5lcNhkoHoUZMuOdGnZUAXvq0UTjYir9kBmhwbkkHZwovhYto6foUHghbxh6rnh1XTk2Ata37T6UI9ftoZtUaEUGjqmGckmTw93Rnk4xjwFNy4HqXQ2E4of3dQYs6J1tuzgnWZbTOPoile0Wo7C',      // <<--- เปลี่ยนเป็น Token ที่มีสิทธิ์เขียน/ลบ (ต้องเป็น Secret Token)
  apiVersion: '2023-01-01',
  useCdn: false, // ต้องเป็น false สำหรับการ Mutation (เขียน/ลบ)
});

const documentType = 'content';

async function deleteDocumentsByType() {
  console.log(`กำลังค้นหาเอกสารประเภท '${documentType}' เพื่อลบ...`);

  try {
    // 1. ค้นหา _id ของเอกสารทั้งหมดที่มี _type เป็น 'Content'
    // *[_type == "Content"]._id
    const ids = await client.fetch(`*[_type == $docType]._id`, { docType: documentType });

    if (ids.length === 0) {
      console.log(`ไม่พบเอกสารประเภท '${documentType}' ที่จะลบ.`);
      return;
    }

    console.log(`พบ ${ids.length} เอกสารประเภท '${documentType}' กำลังดำเนินการลบ...`);

    // 2. สร้างชุด Mutation สำหรับลบเอกสารทั้งหมดที่พบ
    const mutations = ids.map(id => ({
      delete: {
        id: id
      }
    }));

    // 3. ส่งคำสั่ง Mutation ไปยัง Sanity API
    const result = await client.mutate(mutations, {
        // เพิ่ม token ใน options อีกครั้งเพื่อความปลอดภัย (ถ้าไม่ได้ตั้งค่า global ใน client)
        // แต่ถ้าตั้งค่าใน createClient แล้ว ไม่ต้องใส่ซ้ำ
    });

    console.log(`✅ การลบเอกสารประเภท '${documentType}' เสร็จสมบูรณ์`);
    console.log(`จำนวนเอกสารที่ถูกลบ: ${ids.length}`);
    console.log('ผลลัพธ์:', result);

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการลบเอกสาร:', error);
  }
}

deleteDocumentsByType();
