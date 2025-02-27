export interface Expense {
  ID: number;
  description: string;
  amount: number;
  date: string;
  category?: string;
  budgetId?: number;
  userId: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string | null;
}
