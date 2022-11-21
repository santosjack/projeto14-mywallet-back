import joi from "joi";

export const transactionsSchema = joi.object({
  userId: joi.object().required(),
  value: joi.number().required(),
  description: joi.string().required().min(1),
  type: joi.string().required().valid("credit", "debit"),
  date: joi.string(),
});
