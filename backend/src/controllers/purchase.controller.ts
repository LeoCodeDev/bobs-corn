import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";

export class PurchaseController {
  private purchaseService: PurchaseService;

  constructor() {
    this.purchaseService = new PurchaseService();
  }

  purchaseCorn = async (req: Request, res: Response): Promise<void> => {
    try {
      const clientId = req.headers["x-client-id"] as string;
      const ipAddress = req.ip as string;

      if (!clientId) {
        res.status(400).json({
          success: false,
          message: "Client ID is required",
        });
        return;
      }

      const result = await this.purchaseService.createPurchase(
        clientId,
        ipAddress
      );

      if (!result.success) {
        res.status(429).json(result);
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      console.error("Error purchasing corn:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  getPurchases = async (req: Request, res: Response): Promise<void> => {
    try {
      const clientId = req.headers["x-client-id"] as string;

      if (!clientId) {
        res.status(400).json({
          success: false,
          message: "Client ID is required",
        });
        return;
      }

      const purchaseCount = await this.purchaseService.getClientPurchases(
        clientId
      );
      res.status(200).json({ success: true, purchaseCount });
    } catch (error) {
      console.error("Error getting purchases:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
}
