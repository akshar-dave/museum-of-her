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
        <Header />
        <main className="pt-4">{children}</main>
        <div className="bg-no-repeat from-blue-300 to-white bg-gradient-to-b inset-0 fixed -z-10 h-screen pointer-events-none select-none" />
      </body>
    </html>
  );
}
