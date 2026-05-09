import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "codebygio.pro | Full Stack Developer",
  description:
    "Portfolio of Gio Vazquez, the developer behind codebygio.pro. JavaScript and TypeScript Full Stack Developer focused on React, Next.js, Node.js and product-minded web experiences.",
  applicationName: "codebygio.pro",
  icons: {
    icon: [{ url: "/codebygio-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/codebygio-icon.svg"],
    apple: [{ url: "/codebygio-icon.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "codebygio.pro | Gio Vazquez",
    description:
      "Full Stack Developer portfolio focused on polished, product-minded web experiences.",
    url: "https://codebygio.pro",
    siteName: "codebygio.pro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
