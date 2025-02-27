"use client";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  RussianRuble,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideNavProps {
  isSideNavOpen: boolean;
  onClose: () => void;
}

function SideNav({ isSideNavOpen, onClose }: SideNavProps) {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();

  return (
    <div
      className={`h-screen p-5 border shadow-sm bg-white fixed top-0 left-0 w-64 z-50 transition-transform transform ${
        isSideNavOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <RussianRuble className="text-green-950" />
          <p className="font-semibold text-base text-green-950 tracking-wide">
            POCKETIER
          </p>
        </div>
        <button className="md:hidden p-2" onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id} onClick={onClose}>
            <h2
              className={`flex gap-2 text-gray-500 items-center font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${
                path === menu.path ? "text-primary bg-blue-100" : ""
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-10 left-5 flex gap-2 items-center">
        <UserButton />
        <span>Profile</span>
      </div>
    </div>
  );
}

export default SideNav;
