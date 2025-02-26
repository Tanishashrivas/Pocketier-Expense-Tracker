import axiosInstance from "@/app/utils/axiosInstance";
import { IBudgetPayload } from "../_components/CreateBudget";

export const createBudget = async (payload: IBudgetPayload) => {
  try {
    const response = await axiosInstance.post("/budgets", payload);
    return response;
  } catch (error) {
    console.log("Failed to create the budget", error);
    throw error;
  }
};
