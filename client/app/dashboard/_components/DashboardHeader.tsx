import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <button className="md:hidden p-2" onClick={onMenuClick}>
        <Menu />
      </button>
      <div></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
