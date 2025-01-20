import { prisma } from "../lib/prisma";
import { PurchaseResponse } from "../types/purchase.types";

export class PurchaseService {
  private readonly PURCHASE_LIMIT_MINUTES = 1;

  async createPurchase(
    clientId: string,
    ipAddress: string
  ): Promise<PurchaseResponse> {
    const oneMinuteAgo = new Date(
      Date.now() - this.PURCHASE_LIMIT_MINUTES * 60 * 1000
    );

    const recentPurchase = await prisma.purchase.findFirst({
      where: {
        clientId,
        purchaseTime: {
          gte: oneMinuteAgo,
        },
        status: "completed",
      },
    });

    if (recentPurchase) {
      const nextAvailableTime = new Date(
        recentPurchase.purchaseTime.getTime() +
          this.PURCHASE_LIMIT_MINUTES * 60 * 1000
      );

      return {
        success: false,
        message: `Rate limit exceeded. Try again after ${nextAvailableTime.toISOString()}`,
      };
    }

    const purchase = await prisma.purchase.create({
      data: {
        clientId,
        ipAddress,
        status: "completed",
        purchaseTime: new Date(),
      },
    });

    return {
      success: true,
      message: "🌽 Corn purchased successfully!",
      purchaseId: purchase.id,
    };
  }

  async getClientPurchases(clientId: string): Promise<number> {
    return prisma.purchase.count({
      where: {
        clientId,
        status: "completed",
      },
    });
  }
}
