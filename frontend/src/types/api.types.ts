export interface PurchaseResponse {
  success: boolean;
  message: string;
  purchaseId?: string;
}

export interface PurchaseCountResponse {
  success: boolean;
  purchaseCount: number;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
