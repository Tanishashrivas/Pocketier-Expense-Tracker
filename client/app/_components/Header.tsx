"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { RussianRuble } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";

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
      <div className="flex items-center gap-1">
        {/* <Image src={"/logo.png"} alt="logo" width={30} height={30} /> */}
        <RussianRuble className="text-green-950" />
        <p className="font-semibold text-lg text-green-950 tracking-wide">
          {" "}
          POCKETIER{" "}
        </p>
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
