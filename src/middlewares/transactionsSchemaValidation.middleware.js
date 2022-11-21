import { transactionsSchema } from "../models/transactions.model.js";
import dayjs from "dayjs";

export function transactionsSchemaValidation(req, res, next) {
  
  const transaction = req.body;
  const user = req.user;

  const newTransaction = {
    ...transaction,
    userId: user._id,
    date: dayjs().format('DD/MM/YYYY'),
  };

  const { error } = transactionsSchema.validate(newTransaction, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  req.transaction = newTransaction;

  next();
}
