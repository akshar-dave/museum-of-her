import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Museum of Her",
  description: "The Museum of Her",
};

import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-white-100 -z-10 h-screen" />
        <Header />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}
