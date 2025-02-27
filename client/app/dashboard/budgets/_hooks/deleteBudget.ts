import axiosInstance from "@/app/utils/axiosInstance";

export const deleteBudget = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/budgets/${id}`);
    return response;
  } catch (error) {
    console.log("Failed to delete the budget", error);
    throw error;
  }
};
