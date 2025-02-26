"use client";

import { Expense } from "@/app/interface/expense";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getExpenses } from "../_hooks/getExpenses";
import ExpenseListTable from "./_components/ExpenseListTable";

function ExpenseHomepage() {
  const [expensesList, setExpensesList] = useState<Expense[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) getAllExpenses();
  }, [user]);

  const getAllExpenses = async () => {
    const response = await getExpenses();
    setExpensesList(response);
  };
  return (
    <div className="p-5">
      <h2 className="font-bold text-lg mt-5">Latest Expenses</h2>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getAllExpenses()} //changed?
      />
    </div>
  );
}

export default ExpenseHomepage;
