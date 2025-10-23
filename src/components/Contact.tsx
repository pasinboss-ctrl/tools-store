export default function Contact(){
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl grid md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-orange-600 to-orange-500 text-black">
        <div>
          <h3 className="text-2xl font-extrabold">พร้อมให้คำปรึกษาเลือกอุปกรณ์ช่าง</h3>
          <p className="mt-1">ติดต่อเรา หรือแวะหน้าร้านใกล้คุณ</p>
        </div>
        <div className="md:text-right space-x-3">
          <a href="https://line.me/R/ti/p/@yourline" target="_blank"
             className="inline-block rounded-xl bg-black text-orange-400 font-semibold px-5 py-3 border border-black hover:bg-gray-900">
            ทัก LINE
          </a>
          <a href="/contact"
             className="inline-block rounded-xl bg-white text-black font-semibold px-5 py-3 border border-white/20 hover:opacity-90">
            ดูสาขา/ติดต่อ
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[#1f1f1f] border border-gray-800 p-6 text-gray-400">
    
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3872.148721450197!2d100.413438!3d13.949748999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDU2JzU5LjEiTiAxMDDCsDI0JzQ4LjQiRQ!5e0!3m2!1sen!2sth!4v1761186636747!5m2!1sen!2sth" // ⚠️ **แทนที่ด้วย URL ที่คัดลอกมาจาก Google Maps** ⚠️
          width="100%" // ทำให้เต็มความกว้างของ div
          height="450" // กำหนดความสูงตามที่ต้องการ
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      
      </div>
      
    </section>
  );
}

//<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.383676870452!2d100.30069607589758!3d13.995249691608956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e28b6dd6c13c5f%3A0x1aee0ac9f94c35eb!2sThe%20Modish%20Chaiyaphruek-Wongwaen!5e0!3m2!1sen!2sth!4v1761182356037!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>