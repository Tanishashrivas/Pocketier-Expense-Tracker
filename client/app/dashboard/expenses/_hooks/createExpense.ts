import axiosInstance from "@/app/utils/axiosInstance";
import { IExpensePayload } from "../_components/AddExpense";

export const createExpense = async (payload: IExpensePayload) => {
  try {
    const response = await axiosInstance.post("/expenses", payload);
    return response;
  } catch (error) {
    console.log("Failed to create the expense", error);
    throw error;
  }
};
