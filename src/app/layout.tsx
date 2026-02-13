import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Smart Bookmark App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white">
        {children}
      </body>
    </html>
  );
}
