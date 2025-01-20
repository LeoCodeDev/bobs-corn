import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PurchaseResponse } from "@/types/api.types";
import { formatErrorMessage } from "@/utils/date.utils";

interface CornAlertProps {
  response: PurchaseResponse | null;
  error?: string;
}

export const CornAlert: React.FC<CornAlertProps> = ({ response, error }) => {
  if (error) {
    return (
      <Alert
        variant="destructive"
        className="bg-red-900/50 border-red-600 text-white"
      >
        <AlertDescription>{formatErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  }

  if (response?.success) {
    return (
      <Alert className="bg-green-900/50 border-green-600 text-white">
        <AlertDescription>{response.message}</AlertDescription>
      </Alert>
    );
  }

  return null;
};
