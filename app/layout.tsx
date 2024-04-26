import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigationbar from "./components/Navigationbar";
import Footer from "./components/Footer";
import { Providers } from "./components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RustRally",
  description: "Better Together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Navigationbar />
        {children}
        <Footer />
        </Providers>
        </body>
    </html>
  );
}
