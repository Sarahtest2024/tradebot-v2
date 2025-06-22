import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeBot - Fuck it. I need a...",
  description: "The honest trade finder. No bullsh*t, just real trades when you need them.",
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
