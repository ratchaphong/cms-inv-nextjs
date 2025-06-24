import { headers } from "next/headers";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DeviceBlocker from "@/components/deviceBlocker";
import ReduxProvider from "@/store/provider";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "ระบบจัดการสต็อกสินค้า | Bstore",
  description: "แอปสำหรับจัดการสินค้า เพิ่ม ลบ และรายงานสต็อก",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

// ✅ ต้องเป็น async function
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers(); // ✅ ใช้ await
  const pathname = headerList.get("x-invoke-path") || "/";
  const allowedLocales = ["th", "en"];
  const candidate = pathname.split("/")[1];
  const locale = allowedLocales.includes(candidate) ? candidate : "th";

  return (
    <html lang={locale}>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DeviceBlocker />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
