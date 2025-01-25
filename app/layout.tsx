import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import FloatingMessage from "./components/FloatingMessage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Portfolio | Frontend Developer & Designer",
  description: "Frontend Developer and Visual Designer with experience in web design, brand identity and product design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
          <FloatingMessage />
        </NextAuthProvider>
      </body>
    </html>
  );
}
