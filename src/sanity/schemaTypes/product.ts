// src/sanity/schemaTypes/product.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "สินค้า",
  type: "document",           // 👈 ต้องมี
  fields: [
    defineField({ name: "title", title: "ชื่อสินค้า", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "Slug (ลิงก์สินค้า)", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "thumbnail", title: "ภาพหลัก", type: "image", options: { hotspot: true } }),
    defineField({ name: "images", title: "ภาพเพิ่มเติม", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "price", title: "ราคา (บาท)", type: "number" }),
    defineField({ name: "description", title: "รายละเอียดสินค้า", type: "text" }),
    defineField({
      name: "category",
      title: "หมวดหมู่",
      type: "string",
      options: { list: [
        { title: "ลิฟท์ยกรถ", value: "ลิฟท์ยกรถ"},
        { title: "เครื่องตั้งศูนย์", value: "เครื่องตั้งศูนย์"},
        { title: "เครื่องถอดยาง", value: "เครื่องถอดยาง"},
        { title: "เครื่องถ่วงยาง", value: "เครื่องถ่วงยาง" },
        { title: "ห้องพ่นสี", value: "ห้องพ่นสี" },
        { title: "อุปกรณ์ช่าง", value: "อุปกรณ์ช่าง" },
        { title: "อุปกรณ์ซ่อมบำรุงช่วงล่าง", value: "อุปกรณ์ซ่อมบำรุงช่วงล่าง"},
        { title: "อื่นๆ", value: "อื่นๆ"},
      ]},
    }),
    defineField({ name: "inStock", title: "มีสินค้าในสต็อกหรือไม่", type: "boolean", initialValue: true }),
    defineField({
    name: "titleRaw",
    title: "Title (Raw)",
    type: "string",
    //hidden: true,
    initialValue: ({ document }) => document?.title,
    }),
  ],
});
