import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
 
import "./globals.css";

import { cn } from "@/lib/utils"
import Header from "@/components/Header";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Рецепты",
  description: "Вкусные рецепты",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Header />
        {children}</body>
    </html>
  );
}
