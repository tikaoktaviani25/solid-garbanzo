import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopLens - AI Visual Product Search & Price Comparison",
  description: "Find the best prices for any product with AI-powered visual search. Compare prices across multiple retailers, track price history, and save money on every purchase.",
  keywords: "visual search, price comparison, product search, AI shopping, best prices, online shopping, price tracker",
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
