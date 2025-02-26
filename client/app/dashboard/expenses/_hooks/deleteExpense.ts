import axiosInstance from "@/app/utils/axiosInstance";

export const deleteExpense = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/expenses/${id}`);
    return response;
  } catch (error) {
    console.log("Failed to delete the expense", error);
    throw error;
  }
};
