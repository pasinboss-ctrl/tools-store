import type { Metadata } from "next";
//import Link from "next/link";
import { FaFacebookSquare, FaLine, FaShoppingCart, FaStore } from 'react-icons/fa'; 
// หรือใช้ไอคอนจากไลบรารีอื่นที่คุณต้องการ (เช่น AiFillShopping, AiFillShop)

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ที่อยู่ เบอร์ติดต่อ เวลาเปิดทำการ แผนที่ และช่องทาง LINE ของ HIGH PRO",
};

/*const branches = [
  {
    name: "สาขาบางนา",
    address: "123 ถนนสุขุมวิท เขตบางนา กรุงเทพฯ 10260",
    phone: "02-000-0001",
    map: "https://www.google.com/maps?q=13.668217,100.614021&z=15&output=embed",
  },
  {
    name: "สาขารังสิต",
    address: "88 ถ.พหลโยธิน อ.ธัญบุรี ปทุมธานี 12130",
    phone: "02-000-0002",
    map: "https://www.google.com/maps?q=14.042108,100.615485&z=15&output=embed",
  },
];*/

const contactLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/highprotools',
    icon: FaFacebookSquare,
    color: 'text-blue-500', // สีฟ้าของ Facebook
  },
  {
    name: 'LINE Official',
    url: 'https://line.me/R/ti/p/@highpro',
    icon: FaLine,
    color: 'text-green-500', // สีเขียวของ Line
  },
  {
    name: 'Shopee Store',
    url: 'https://shopee.co.th/shop/1607113892',
    icon: FaShoppingCart,
    color: 'text-orange-500', // สีส้มของ Shopee
  },
  {
    name: 'LAZADA Store',
    url: 'https://www.lazada.co.th/shop/hightools',
    icon: FaStore,
    color: 'text-blue-700', // สีน้ำเงินของ Lazada
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-white">
      <h1 className="text-2xl md:text-3xl font-bold">ติดต่อเรา</h1>

      {/* Top CTA / Info */}
      <section className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-[#1f1f1f] border border-gray-800 p-6">
          <div className="font-semibold">ที่อยู่ (สำนักงานใหญ่)</div>
          <div className="mt-2 text-gray-300">
            59/134 หมู่ 5 ตำบล ละหาร อำเภอ บางบัวทอง จังหวัด นนทบุรี 11110
          </div>
          <div className="mt-4 font-semibold">เวลาเปิดทำการ</div>
          <div className="mt-1 text-gray-300">จันทร์–เสาร์ 09:00–18:00</div>

          <div className="mt-4 font-semibold">โทรศัพท์</div>
          <div className="mt-1 text-gray-300">064-962-6224</div>

          <div className="mt-4 font-semibold">อีเมล</div>
          <div className="mt-1 text-gray-300">highproequipment@gmail.com</div>

          <div className="mt-6">
            <a
              href="https://line.me/R/ti/p/@highpro"
              target="_blank"
              className="inline-block rounded-xl bg-orange-600 text-black font-semibold px-5 py-3 hover:bg-orange-500"
            >
              ทัก LINE
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-gray-800">
          <iframe
            title="สำนักงานใหญ่ HIGH PRO"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3872.148721450197!2d100.413438!3d13.949748999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDU2JzU5LjEiTiAxMDDCsDI0JzQ4LjQiRQ!5e0!3m2!1sen!2sth!4v1761186636747!5m2!1sen!2sth"
            className="w-full h-[320px] md:h-[380px]"
            loading="lazy"
          />
        </div>
      </section>

      {/* Form (ไม่บังคับ; ช่องทางหลักคือ LINE) */}
      <section className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-[#1f1f1f] border border-gray-800 p-6">
          <h2 className="text-lg font-bold">ส่งข้อความถึงเรา</h2>
          <p className="mt-1 text-gray-400 text-sm">
            ถ้าต้องการความรวดเร็ว แนะนำทัก LINE (ปุ่มด้านบน)
          </p>
          {/* ตัวอย่างฟอร์มแบบพื้นฐาน: POST ไปยัง Formspree (เปลี่ยนเป็นของคุณ) */}
          <form
            action="https://formsubmit.co/highproequipment@gmail.com"
            method="POST"
            className="mt-4 grid grid-cols-1 gap-3"
            >
            <input type="hidden" name="_subject" value="มีข้อความใหม่จากเว็บไซต์" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

            <input name="name" required placeholder="ชื่อ*" className="rounded-xl bg-black/40 border border-gray-800 px-3 py-2" />
            <input name="phone" placeholder="เบอร์โทร" className="rounded-xl bg-black/40 border border-gray-800 px-3 py-2" />
            <input type="email" name="email" placeholder="อีเมล" className="rounded-xl bg-black/40 border border-gray-800 px-3 py-2" />
            <textarea name="message" required rows={4} placeholder="ข้อความ*" className="rounded-xl bg-black/40 border border-gray-800 px-3 py-2" />
            <button className="rounded-xl bg-orange-600 text-black font-semibold px-5 py-3 hover:bg-orange-500" type="submit">
            ส่งข้อความ
            </button>
        </form>

          {/* หรือ mailto แบบเร็ว (สำรอง) */}
          <div className="mt-3 text-sm text-gray-400">
            หรือส่งอีเมล:{" "}
            <a href="mailto:highproequipment@gmail.com?subject=สอบถามสินค้า HIGH PRO" className="text-orange-400 underline">
              highproequipment@gmail.com
            </a>
          </div>
        </div>

        {/* Branches */}
        {/*
        <div>
          <h2 className="text-lg font-bold">สาขา</h2>
          <div className="mt-3 space-y-4">
            {branches.map((b) => (
              <div key={b.name} className="rounded-2xl bg-[#1f1f1f] border border-gray-800">
                <div className="p-4">
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-gray-300 text-sm">{b.address}</div>
                  <div className="text-gray-300 text-sm mt-1">โทร: {b.phone}</div>
                </div>
                <iframe title={b.name} src={b.map} className="w-full h-44 border-t border-gray-800" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
       */}
       <div>
          <h2 className="text-lg font-bold mt-8">ช่องทางติดต่อและ E-Commerce</h2>
          <div className="mt-3 space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-2xl bg-[#1f1f1f] border border-gray-800 transition duration-300 hover:bg-gray-800/50"
              >
                {/* Icon (ใช้ Component ที่ Import มา) */}
                <link.icon className={`w-6 h-6 mr-4 ${link.color}`} />
                
                {/* ชื่อลิงก์ */}
                <span className="font-semibold text-gray-200">{link.name}</span>

                {/* Arrow icon (เป็นทางเลือก) */}
                <span className="ml-auto text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ สั้น ๆ */}
      <section className="mt-10">
        <h2 className="text-lg font-bold">คำถามที่พบบ่อย</h2>
        <div className="mt-3 divide-y divide-gray-800 rounded-2xl border border-gray-800">
          {[
            { q: "มีบริการติดตั้งหรือไม่?", a: "มีครับ เรามีทีมงานพร้อมติดตั้งและสอนการใช้งาน" },
            { q: "รับประกันกี่ปี?", a: "ขึ้นอยู่กับรุ่นนั้นๆตามเงื่อนไขของบริษัทกำหนด" },
            { q: "ชำระเงินช่องทางใดได้บ้าง?", a: "โอนชำระ/ใบกำกับภาษี/เงื่อนไขเครดิตสำหรับนิติบุคคล" },
          ].map((f) => (
            <details key={f.q} className="group">
              <summary className="cursor-pointer list-none px-4 py-3 hover:bg-black/40">
                <span className="font-medium">{f.q}</span>
              </summary>
              <div className="px-4 pb-4 text-gray-300">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* JSON-LD: LocalBusiness */}
      <script
        type="application/ld+json"
        className="sr-only"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "HIGH PRO Tools",
            url: "https://your-domain.com",
            telephone: "+66-2-000-0000",
            address: {
              "@type": "PostalAddress",
              streetAddress: "59/134 หมู่ 5 ตำบล ละหาร อำเภอ บางบัวทอง",
              addressLocality: "นนทบุรี",
              postalCode: "1110",
              addressCountry: "TH",
            },
            openingHours: "Mo-Sa 09:00-18:00",
            sameAs: ["https://www.facebook.com/highprotools"],
          }),
        }}
      />
    </main>
  );
}
