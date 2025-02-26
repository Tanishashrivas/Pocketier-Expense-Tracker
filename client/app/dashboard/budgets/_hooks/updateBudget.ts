import axiosInstance from "@/app/utils/axiosInstance";
import { IBudgetPayload } from "../_components/CreateBudget";

export const updateBudget = async (id: string, payload: IBudgetPayload) => {
  try {
    const response = await axiosInstance.put(`/budgets/${id}`, payload);
    return response;
  } catch (error) {
    console.log("Failed to update the budget", error);
    throw error;
  }
};
