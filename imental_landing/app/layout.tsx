import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iMental State Tracker - AI-Powered Mental Health Monitoring",
  description: "Monitor your daily activities, detect potential symptoms of mental health concerns, and receive personalized AI-driven insights with tailored recommendations.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>{children}</body>
    </html>
  );
}
