import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
});

export const metadata: Metadata = {
  title: "Kritanta | India's No. 1 Custom Wall Poster Store",
  description: "Premium quality custom wall posters delivered to your doorstep. Shop car posters, devotional, gaming, and more at Kritanta.",
};

import CartDrawer from "@/components/cart/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={questrial.className}>
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
