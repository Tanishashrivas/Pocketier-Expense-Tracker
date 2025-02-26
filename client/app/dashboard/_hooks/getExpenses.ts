import axiosInstance from "@/app/utils/axiosInstance";

export const getExpenses = async () => {
  try {
    const response = await axiosInstance.get("/expenses");
    return response?.data?.expenses;
  } catch (error) {
    console.log("Failed to fetch the expenses", error);
    throw error;
  }
};
