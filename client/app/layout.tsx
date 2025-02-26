"use client";

import { ClerkProvider, useAuth, useUser } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import { ReactNode, useEffect } from "react";
import { Toaster } from "../components/ui/sonner";
import "./globals.css";
import AuthProvider from "./utils/authProvider";
import axiosInstance from "./utils/axiosInstance";

const outfit = Outfit({ subsets: ["latin"] });

interface ILayoutProps {
  children: ReactNode;
}

function SaveUser() {
  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (userId && user?.primaryEmailAddress?.emailAddress) {
      const registerUser = async () => {
        const body = {
          userId: userId,
          email: user?.primaryEmailAddress?.emailAddress,
          name: user.fullName || "Unknown",
        };
        const response = await axiosInstance.post("/user", body);
        console.log(response);
      };

      registerUser();
    }
  }, [userId, user]);

  return null;
}

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en">
          <body className={outfit.className}>
            <SaveUser />
            <Toaster />
            {children}
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}
