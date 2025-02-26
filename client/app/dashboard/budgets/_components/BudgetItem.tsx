"use client";

import { Budget } from "@/app/interface/budget";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalculateTotalAmountandSpend } from "../../_components/CardInfo";

function BudgetItem({ budget }: { budget: Budget }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    const data = CalculateTotalAmountandSpend(budget);
    setTotalBudget(data.totalBudget);
    setTotalSpend(data.totalSpend);
  }, [budget]);

  const calculateProgressPerc = () => {
    const perc = (totalSpend / totalBudget) * 100;
    return isNaN(perc) ? 0 : perc.toFixed(2);
  };

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 items-center justify-between ">
          <div className="flex gap-2 items-center ">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              <ShoppingBasket />
            </h2>
            <div>
              <h2 className="font-bold">{budget?.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget?.expenses?.length} Item
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">
            ${budget?.totalAmount}
          </h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              {totalSpend ? totalSpend : 0} Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              {totalBudget - totalSpend} Remaining
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className=" bg-primary h-2 rounded-full"
              style={{ width: `${calculateProgressPerc()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
