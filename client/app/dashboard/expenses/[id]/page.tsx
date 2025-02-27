"use client";

import { Budget } from "@/app/interface/budget";
import { Expense } from "@/app/interface/expense";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getExpenses } from "../../_hooks/getExpenses";
import BudgetItem from "../../budgets/_components/BudgetItem";
import { deleteBudget } from "../../budgets/_hooks/deleteBudget";
import { getBudgetById } from "../../budgets/_hooks/getBudgetById";
import AddExpense from "../_components/AddExpense";
import EditBudget from "../_components/EditBudget";
import ExpenseListTable from "../_components/ExpenseListTable";

function ExpensesScreen() {
  const router = useRouter();
  const { id } = useParams();
  const numericId = id ? Number(id) : null;

  const [expensesList, setExpensesList] = useState<Expense[]>();
  const [budgetInfo, setBudgetInfo] = useState<Budget>();

  const getExpensesList = async () => {
    const response = await getExpenses();
    setExpensesList(response.data);
  };

  const getBudgetInfo = useCallback(async () => {
    if (!numericId) return;
    try {
      const response = await getBudgetById(numericId);
      setBudgetInfo(response.data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  }, [numericId]);

  useEffect(() => {
    getBudgetInfo();
  }, [getBudgetInfo]);

  const handleDeleteBudget = async () => {
    if (!numericId) return;
    try {
      await deleteBudget(numericId);
      toast("Budget Deleted!");
      router.replace("/dashboard/budgets");
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
          {budgetInfo && (
            <EditBudget budgetInfo={budgetInfo} refreshData={getBudgetInfo} />
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex gap-2">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses. And remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteBudget}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="w-full h-[150px] bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        {numericId && (
          <AddExpense budgetId={numericId} refreshData={getBudgetInfo} />
        )}
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expensesList={expensesList || []}
          refreshData={() => getExpensesList()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
