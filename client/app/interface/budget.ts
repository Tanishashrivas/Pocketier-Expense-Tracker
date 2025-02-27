import { Expense } from "./expense";

export interface Budget {
  ID: number;
  name: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  userId: string;
  expenses: Expense[];
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string | null;
}
