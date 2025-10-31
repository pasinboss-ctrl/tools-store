export const qProducts = /* groq */ `
*[_type == "product"]|order(_createdAt desc){
  title,
  "slug": slug.current,
  price,
  inStock,
  thumbnail,
}
`;

export const qProductBySlug = /* groq */ `
*[_type == "product" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  price,
  inStock,
  description,
  thumbnail,
  images
}
`;

export const qProductSlugs = /* groq */ `
*[_type == "product" && defined(slug.current)]{
  "slug": slug.current
}
`;
// src/sanity/lib/queries.ts
export const qProductsList = /* groq */ `
{
  "items": *[_type == "product"
  && ($useCat == false || category == $cat)
]|order(_createdAt desc){
  title,
  "slug": slug.current,
  price,
  category,
  thumbnail,
  titleRaw
},
  "categories": array::unique(*[_type == "product"].category)
}
`;
//    && ($useQ == false || lower(titleRaw) match lower($qQuery))
//    && ($useQ == false || title match $qQuery)
export const qPromoList = 
`
  *[_type == "promo"]|order(_createdAt desc){
  title,
  "slug": slug.current,
  banner,
  desc,
  fulldesc,
}
`;

export const qContentList = 
`
  *[_type == "news"]|order(_createdAt desc){
  title,
  "slug": slug.current,
  banner,
  desc,
  fulldesc,
  tag,
  startsAt,
}
`;