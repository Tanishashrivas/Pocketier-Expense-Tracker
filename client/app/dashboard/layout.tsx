"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";
import { getBudgets } from "./_hooks/getBudgets";

function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  useEffect(() => {
    if (user) checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const response = await getBudgets();
    if (response?.data?.length == 0) {
      router.push("/dashboard/budgets");
    }
  };

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  return (
    <div className="relative">
      {isSideNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={closeSideNav}
        ></div>
      )}
      <div
        className={`fixed z-20 md:w-64 ${
          isSideNavOpen ? "block" : "hidden"
        } md:block`}
      >
        <SideNav isSideNavOpen={isSideNavOpen} onClose={closeSideNav} />
      </div>
      <div className="md:ml-64">
        <DashboardHeader onMenuClick={toggleSideNav} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
