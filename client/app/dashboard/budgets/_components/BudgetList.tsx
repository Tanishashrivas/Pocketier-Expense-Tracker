"use client";

import { Budget } from "@/app/interface/budget";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getBudgets } from "../../_hooks/getBudgets";
import BudgetItem from "./BudgetItem";
import CreateBudget from "./CreateBudget";

function BudgetList() {
  const [budgetList, setBudgetList] = useState<Budget[]>([]);

  const { user } = useUser();
  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    const response = await getBudgets();
    console.log(response);
    setBudgetList(response);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0 &&
          budgetList.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))}
      </div>
    </div>
  );
}

export default BudgetList;
