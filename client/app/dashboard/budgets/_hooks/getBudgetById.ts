import axiosInstance from "@/app/utils/axiosInstance";

export const getBudgetById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/budgets/${id}`);
    return response;
  } catch (error) {
    console.log("Failed to retrieve the budget", error);
    throw error;
  }
};
