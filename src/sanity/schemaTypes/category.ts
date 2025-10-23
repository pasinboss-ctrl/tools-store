import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "ชื่อหมวด",
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
      name: "icon",
      title: "ไอคอน/รูปหมวด (ไม่บังคับ)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", media: "icon" },
  },
});
