import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.controller";

const router = Router();
const purchaseController = new PurchaseController();

router.post("/purchase", purchaseController.purchaseCorn);
router.get("/purchases", purchaseController.getPurchases);

export default router;
