import axiosInstance from "@/app/utils/axiosInstance";

export const getBudgets = async () => {
  try {
    const response = await axiosInstance.get("/budgets");
    return response?.data?.budgets;
  } catch (error) {
    console.log("Failed to fetch the budgets", error);
    throw error;
  }
};
