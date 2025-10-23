import { defineType, defineField } from "sanity";

export default defineType({
  name: "news",
  title: "บทความ",
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
      title: "ชื่อบทความ",
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
     defineField({
      name: "tag",
      title: "หมวดหมู่",
      type: "string",
      options: { list: [
        { title: "CHECKLIST", value: "CHECKLIST" },
        { title: "TIPS", value: "TIPS" },
        { title: "GUIDE", value: "GUIDE" },
      ]},
    }),
  ],
  preview: {
    select: { title: "title", media: "banner", subtitle: "desc" },
  },
});
