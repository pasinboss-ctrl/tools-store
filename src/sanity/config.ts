import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemaTypes from "./schemaTypes";
import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: "default",
  title: "HIGH PRO CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // ✅ ต้องใช้ NEXT_PUBLIC_*
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), media()],
  schema: { types: schemaTypes },
});
