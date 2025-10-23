// src/sanity/lib/image.ts
import imageUrlBuilder from "@sanity/image-url";
import { sanity } from "./client";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanity);
export const urlFor = (source: SanityImageSource) => builder.image(source);
