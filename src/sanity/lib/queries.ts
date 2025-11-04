export const qProducts = /* groq */ `
*[_type == "product" && isActive == true]|order(_createdAt desc){
  title,
  "slug": slug.current,
  price,
  inStock,
  thumbnail,
  isActive,
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
  images,
  isActive,
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
  titleRaw,
  inStock,
},
  "categories": array::unique(*[_type == "product"].category)
}
`;
//    && ($useQ == false || lower(titleRaw) match lower($qQuery))
//    && ($useQ == false || title match $qQuery)
export const qPromoList = 
`
  *[_type == "promo" && isActive == true && startsAt <= now() && endsAt >= now()]|order(startsAt desc){
  title,
  "slug": slug.current,
  banner,
  desc,
  fulldesc,
  startsAt,
  endsAt,
  isActive,
}
`;

export const qContentList = 
`
  *[_type == "news" && isActive == true && startsAt <= now() && endsAt >= now()]|order(startsAt desc){
  title,
  "slug": slug.current,
  banner,
  desc,
  fulldesc,
  tag,
  startsAt,
  endsAt,
  isActive,
}
`;