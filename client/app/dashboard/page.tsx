"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Budget } from "../interface/budget";
import { Expense } from "../interface/expense";
import BarChartDashboard from "./_components/BarChartDashboard";
import CardInfo from "./_components/CardInfo";
import { getBudgets } from "./_hooks/getBudgets";
import { getExpenses } from "./_hooks/getExpenses";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const [budgetList, setBudgetList] = useState<Budget[]>([]);
  const [expensesList, setExpensesList] = useState<Expense[]>([]);
  const { user } = useUser();
  useEffect(() => {
    if (user) getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const response = await getBudgets();
    setBudgetList(response);
  };

  const getAllExpenses = async () => {
    const response = await getExpenses();
    console.log(response);
    setExpensesList(response);
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Here&apos;s what happening with your money, Let&apos;s manage your
        expense
      </p>

      <CardInfo budgetList={budgetList} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <h2 className="font-bold text-lg mt-5">Latest Expenses</h2>
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getAllExpenses()}
          />
        </div>
        {budgetList?.length > 0 ? (
          <div className="">
            <h2 className="font-bold text-lg">Latest Budgets</h2>
            {budgetList?.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
