import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopSnap - Visual Product Search & Price Comparison",
  description: "Find products instantly by taking a photo. Compare prices across multiple stores and save money with ShopSnap's AI-powered visual search.",
  keywords: "visual search, product search, price comparison, shopping, AI, image recognition",
  authors: [{ name: "ShopSnap" }],
  openGraph: {
    title: "ShopSnap - Visual Product Search",
    description: "Find products instantly by taking a photo. Compare prices and save money.",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
