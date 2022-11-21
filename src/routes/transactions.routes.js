import { Router } from "express";
import {
  createTransaction,
  findTransactions
} from "../controllers/transactions.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { transactionsSchemaValidation } from "../middlewares/transactionsSchemaValidation.middleware.js";

const router = Router();
router.use(authValidation);

router.post("/transactions", authValidation, transactionsSchemaValidation, createTransaction);
router.get("/transactions", authValidation, findTransactions);

export default router;