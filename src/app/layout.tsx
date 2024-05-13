import type { Metadata } from "next";
import "@/ui/globals.css";

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
        <body style={{margin: 0}}>{children}</body>
      </html>
);
}
