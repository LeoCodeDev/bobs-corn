import { useState, useEffect, useCallback } from "react";
import { purchaseCorn, getPurchaseCount } from "@/services/api.service";
import type { PurchaseResponse } from "@/types/api.types";

export const useCornPurchase = () => {
  const [purchaseCount, setPurchaseCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [lastResponse, setLastResponse] = useState<PurchaseResponse | null>(
    null
  );

  const fetchPurchaseCount = useCallback(async () => {
    try {
      const count = await getPurchaseCount();
      setPurchaseCount(count);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al conectar con el servidor"
      );
    }
  }, []);

  useEffect(() => {
    fetchPurchaseCount();
  }, [fetchPurchaseCount]);

  const handlePurchase = async () => {
    setLoading(true);
    setLastResponse(null);
    setError("");

    try {
      const response = await purchaseCorn();
      setLastResponse(response);

      if (response.success) {
        await fetchPurchaseCount();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al intentar comprar maíz"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    purchaseCount,
    loading,
    error,
    lastResponse,
    handlePurchase,
  };
};
