import axios from "axios";
import { PurchaseResponse, PurchaseCountResponse } from "@/types/api.types";

const API_URL = "http://localhost:3000/api";
const CLIENT_ID = crypto.randomUUID(); // Generamos un ID único por sesión

// Configuración base de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-client-id": CLIENT_ID,
  },
});

export const purchaseCorn = async (): Promise<PurchaseResponse> => {
  try {
    const { data } = await api.post<PurchaseResponse>("/purchase");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data as PurchaseResponse;
    }
    throw error;
  }
};

export const getPurchaseCount = async (): Promise<number> => {
  try {
    const { data } = await api.get<PurchaseCountResponse>("/purchases");
    return data.purchaseCount;
  } catch (error) {
    console.error("Error fetching purchase count:", error);
    return 0;
  }
};
