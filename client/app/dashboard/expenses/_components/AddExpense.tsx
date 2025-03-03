"use client";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { createExpense } from "../_hooks/createExpense";

export interface IExpensePayload {
  description: string;
  category: string;
  amount: number;
  date: string;
  budgetId: number | null;
}

export interface IExpenseForm {
  description: string;
  category: string;
  amount: string;
  date: Date | null;
}

interface IAddExpenseProps {
  budgetId?: number;
  refreshData: () => void;
}

function AddExpense({ budgetId, refreshData }: IAddExpenseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<IExpenseForm>({
    description: "",
    category: "",
    amount: "",
    date: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onAddExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.date) {
      setError("All fields are required.");
      return;
    }

    const body: IExpensePayload = {
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date ? new Date(formData.date).toISOString() : "",
      budgetId: budgetId || null,
    };

    try {
      await createExpense(body);
      refreshData();
      toast.success("Expense added successfully!");

      setFormData({ description: "", category: "", amount: "", date: null });
      setError("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-1/3 bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed cursor-pointer hover:shadow-md">
          <h2 className="text-3xl">+</h2>
          <h2>Add New Expense</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            <form onSubmit={onAddExpense} className="mt-5 space-y-4">
              <Input
                name="description"
                placeholder="e.g. Veggies 🥦"
                value={formData.description}
                required
                onChange={handleChange}
              />
              <Input
                name="category"
                placeholder="e.g. Food, Travel"
                value={formData.category}
                required
                onChange={handleChange}
              />
              <Input
                name="amount"
                type="number"
                placeholder="e.g. 100$"
                value={formData.amount}
                required
                onChange={handleChange}
              />

              <DatePickerWithRange
                selected={formData.date ? { from: formData.date } : undefined}
                onSelect={(range) =>
                  setFormData((prev) => ({
                    ...prev,
                    date: range?.from ?? null,
                  }))
                }
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={
                      !formData.category || !formData.amount || !formData.date
                    }
                    className="mt-5 w-full"
                  >
                    Add Expense
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpense;
