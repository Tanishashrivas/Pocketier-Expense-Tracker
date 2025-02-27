"use client";

import { Budget } from "@/app/interface/budget";
import { Button } from "@/components/ui/button";
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
import { PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateBudget } from "../../budgets/_hooks/updateBudget";

interface IEditBudgetProps {
  budgetInfo: Budget;
  refreshData: () => void;
}

function EditBudget({ budgetInfo, refreshData }: IEditBudgetProps) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (budgetInfo) {
      setName(budgetInfo.name);
      setAmount(budgetInfo.totalAmount);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const updatedPayload = {
      ...budgetInfo,
      name: name,
      totalAmount: amount ?? 0,
    };

    const response = await updateBudget(budgetInfo.ID, updatedPayload);
    console.log(response);
    if (response) {
      refreshData();
      toast("Budget Updated");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    defaultValue={budgetInfo?.name}
                    placeholder="e.g. Groceries"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    defaultValue={budgetInfo?.totalAmount}
                    type="number"
                    placeholder="e.g. 500$"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
                className="mt-5 w-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
