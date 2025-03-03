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
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { toast } from "sonner";
import { createBudget } from "../_hooks/createBudget";

export interface IBudgetPayload {
  name: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
}

export interface IBudgetForm {
  name: string;
  totalAmount: string;
  dateRange: { from: Date | null; to: Date | null };
}

function CreateBudget({ refreshData }: { refreshData: () => void }) {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [formData, setFormData] = useState<IBudgetForm>({
    name: "",
    totalAmount: "",
    dateRange: { from: null, to: null } as {
      from: Date | null;
      to: Date | null;
    },
  });
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onCreateBudget = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      Object.values(formData).some((v) => !v) ||
      !formData.dateRange.from ||
      !formData.dateRange.to
    ) {
      setError("All fields are required.");
      return;
    }

    const body: IBudgetPayload = {
      name: formData.name,
      totalAmount: parseFloat(formData.totalAmount),
      startDate: formData.dateRange.from
        ? new Date(formData.dateRange.from).toISOString()
        : "",
      endDate: formData.dateRange.to
        ? new Date(formData.dateRange.to).toISOString()
        : "",
    };

    try {
      await createBudget(body);
      refreshData();
      toast.success("Budget added successfully!");
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to add budget. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed cursor-pointer hover:shadow-md">
          <h2 className="text-3xl">+</h2>
          <h2>Create New Budget</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>
            <form onSubmit={onCreateBudget} className="mt-5 space-y-4">
              <div className="relative">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-20 bg-white shadow-md p-2 rounded-md">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        if (e?.emoji) setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <Input
                name="name"
                placeholder="e.g. Groceries"
                value={formData.name}
                required
                onChange={handleChange}
              />
              <Input
                name="totalAmount"
                type="number"
                placeholder="e.g. 5000$"
                value={formData.totalAmount}
                required
                onChange={handleChange}
              />

              <DatePickerWithRange
                selected={
                  formData.dateRange
                    ? {
                        from: formData.dateRange.from ?? undefined,
                        to: formData.dateRange.to ?? undefined,
                      }
                    : undefined
                }
                onSelect={(range) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateRange: {
                      from: range?.from ?? null,
                      to: range?.to ?? null,
                    },
                  }))
                }
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    disabled={
                      Object.values(formData).some((v) => !v) ||
                      !formData.dateRange.from ||
                      !formData.dateRange.to
                    }
                    className="mt-5 w-full"
                  >
                    Create Budget
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

export default CreateBudget;
