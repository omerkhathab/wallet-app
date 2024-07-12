import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "./AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet App",
  description: "A simple wallet app",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <div className="flex flex-col flex-1">
            <AppbarClient />
            <div className="flex flex-1">
              {children}
            </div>
          </div>
        </body>
      </Providers>
    </html>
  );
}
