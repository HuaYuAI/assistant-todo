import type { Metadata } from "next";
import "@/ui/globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "任务管理",
  description: "任务管理小助手",
};
/**
 * Root Layout (Required)
 * @param children
 * @constructor
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html>
      <Script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"/>
      <Script src="https://cdn.jsdelivr.net/npm/dayjs@1/locale/zh-cn.js"/>
      <body style={{margin: 0}}>{children}</body>
      </html>
  );
}
