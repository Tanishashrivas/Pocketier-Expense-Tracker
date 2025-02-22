import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import { Toaster } from "../components/ui/sonner";
import "./globals.css";
import { ReactNode } from "react";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Pocketier",
  description: "Track. Save. Thrive",
};

interface ILayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
