import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: "Gio Vazquez | Full Stack Developer",
  description:
    "Portfolio of Gio Vazquez, a JavaScript and TypeScript Full Stack Developer focused on React, Next.js, Node.js and product-minded web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
