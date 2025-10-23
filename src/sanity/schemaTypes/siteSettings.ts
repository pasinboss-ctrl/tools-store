import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings (ตั้งค่าเว็บไซต์)",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "ชื่อเว็บไซต์/แบรนด์",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "โลโก้",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "phone",
      title: "เบอร์โทร",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "อีเมล",
      type: "string",
    }),
    defineField({
      name: "lineOA",
      title: "LINE Official Account (ลิงก์)",
      type: "url",
    }),
    defineField({
      name: "address",
      title: "ที่อยู่",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "openingHours",
      title: "เวลาเปิดทำการ (เช่น Mo-Sa 09:00-18:00)",
      type: "string",
    }),
    defineField({
      name: "heroDesktop",
      title: "Hero (Desktop)",
      type: "image",
      options: { hotspot: true },
      description: "ภาพหน้าแรกสำหรับเดสก์ท็อป",
    }),
    defineField({
      name: "heroMobile",
      title: "Hero (Mobile)",
      type: "image",
      options: { hotspot: true },
      description: "ภาพหน้าแรกสำหรับมือถือ",
    }),
    defineField({
      name: "socialLinks",
      title: "โซเชียลลิงก์",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "แพลตฟอร์ม", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "siteName", media: "logo" },
  },
});
