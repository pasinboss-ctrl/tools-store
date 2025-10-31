"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar({
  categories,
  defaultCat,
  defaultQ,
}: {
  categories: string[];
  defaultCat?: string;
  defaultQ?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const cat = e.target.value;
    if (cat) params.set("cat", cat);
    else params.delete("cat");
    router.push(`/products?${params.toString()}`); // ✅ rerender หน้าใหม่อัตโนมัติ
  };

  return (
    <form className="mt-4 grid gap-3 md:grid-cols-3">
      <input
        name="q"
        defaultValue={defaultQ}
        placeholder="ค้นหาสินค้า..."
        className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
      />
      <select
        name="cat"
        defaultValue={defaultCat}
        onChange={handleCategoryChange} // ✅ trigger rerender
        className="rounded-xl bg-[#1f1f1f] border border-gray-800 px-3 py-2 outline-none focus:border-orange-500"
      >
        <option value="">ทุกหมวดหมู่</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        className="rounded-xl bg-orange-600 text-black font-semibold px-4 py-2 hover:bg-orange-500"
        type="submit"
      >
        ค้นหา
      </button>
    </form>
  );
}
