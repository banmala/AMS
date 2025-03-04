import axios from "axios";

export const apiRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.log("Error: ", error)
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw error.response?.data || new Error("An error occurred.");
    }
    throw new Error("An unexpected error occurred.");
  }
};