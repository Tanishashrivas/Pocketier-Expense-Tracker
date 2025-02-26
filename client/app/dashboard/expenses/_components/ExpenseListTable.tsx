import { Expense } from "@/app/interface/expense";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteExpense } from "../_hooks/deleteExpense";
import AddExpense from "./AddExpense";

interface IExpenseListTableProps {
  expensesList: Expense[];
  refreshData: () => void;
}

function ExpenseListTable({
  expensesList,
  refreshData,
}: IExpenseListTableProps) {
  const router = useRouter();

  const handleDeleteExpense = async (id: number) => {
    await deleteExpense(id);
    toast("Expense Deleted Successfully!");
    refreshData();
  };

  return (
    <div className="mt-3">
      {expensesList?.length > 0 ? (
        <>
          <div className="grid grid-cols-4 bg-slate-200 p-2 font-bold">
            <h2>Category</h2>
            <h2>Amount</h2>
            <h2>Date</h2>
            <h2>Action</h2>
          </div>

          {expensesList.map((expense: Expense, index: number) => (
            <div
              key={index}
              className="grid grid-cols-4 bg-slate-100 p-2 cursor-pointer"
              onClick={() => router.push(`/dashboard/expenses/${expense.ID}`)}
            >
              <h2>{expense.category}</h2>
              <h2>{expense.amount}</h2>
              <h2>{format(new Date(expense.date), "dd MMM yyyy")}</h2>

              <h2>
                <Trash
                  size={16}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteExpense(expense?.ID)}
                />
              </h2>
            </div>
          ))}
        </>
      ) : (
        <AddExpense refreshData={refreshData} />
      )}
    </div>
  );
}

export default ExpenseListTable;
