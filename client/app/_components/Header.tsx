"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";

function Header() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex items-centergap-1">
        <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        <p className="font-semibold text-base text-green-950"> POCKETIER </p>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/signin"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
