import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-01";

// ✅ กันพลาด: ถ้าค่าไหนหาย ให้ฟ้องทันทีด้วยข้อความอ่านง่าย
if (!projectId) throw new Error("Missing env NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset)   throw new Error("Missing env NEXT_PUBLIC_SANITY_DATASET");

console.log("SANITY ENV:", { projectId, dataset, apiVersion });

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN, // ใส่ถ้าจะอ่าน draft
});
