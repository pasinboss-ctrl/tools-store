import { defineType, defineField } from "sanity";

export default defineType({
  name: "promo",
  title: "Promotion / Brochure",
  type: "document",
  fields: [
  defineField({
    name: "id",
    title: "ลำดับ",
    type: "number",
    validation: (Rule) => Rule
        .required()
        .integer(),
    }),
    defineField({
      name: "title",
      title: "ชื่อโปรโมชัน",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "banner",
      title: "ภาพแบนเนอร์",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desc",
      title: "รายละเอียดสั้น",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fulldesc",
      title: "รายละเอียด",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "startsAt",
      title: "เริ่ม",
      type: "datetime",
    }),
    defineField({
      name: "endsAt",
      title: "สิ้นสุด",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "เปิดใช้งาน",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", media: "banner", subtitle: "desc" },
  },
});
