import "./globals.css";
import type { Metadata } from "next";
//import { Noto_Sans_Thai } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/*const noto = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300","400","500","700"],
  variable: "--font-noto",
});
*/
export const metadata: Metadata = {
  title: "HIGH PRO",
  description: "อุปกรณ์ช่างครบ จบที่เดียว",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-black text-white">
        {/* Header อยู่ใน body */}
        <Header />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}