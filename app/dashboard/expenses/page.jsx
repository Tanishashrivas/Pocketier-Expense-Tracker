"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
// import { db } from "../../../../utils/dbConfig";
// import { Budgets, expenses } from "../../../../utils/schema";
// import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import ExpenseListTable from "./_components/ExpenseListTable";

function page() {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {};

  const getAllExpenses = async () => {};
  return (
    <div className="p-5">
      <h2 className="font-bold text-lg mt-5">Latest Expenses</h2>
      <ExpenseListTable
        expensesList={expensesList}
        refreshData={() => getBudgetList()}
      />
    </div>
  );
}

export default page;
