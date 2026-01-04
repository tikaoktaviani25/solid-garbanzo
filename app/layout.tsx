import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VulnScanner Pro - Advanced Web Vulnerability Scanner",
  description: "Professional web vulnerability scanner with advanced features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
