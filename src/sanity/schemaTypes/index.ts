// src/sanity/schemaTypes/index.ts
import product from "./product";
import promo from "./promo"
//import content from "./content"
import news from "./news"
// ให้ใส่เฉพาะสคีมาที่ยืนยันว่ามีไฟล์จริงและ export ถูกต้องเท่านั้น
const schemaTypes = [product,promo,news];

export default schemaTypes;
