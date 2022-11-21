import { ObjectId } from "mongodb";
import {
  sessionsCollection,
  usersCollection,
  transactionsCollection
} from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import { transactionsSchema } from "../models/transactions.model.js";
import dayjs from "dayjs";

export async function createTransaction(req, res) {
 const transaction = req.transaction;
  const user = req.user;

  try {
    let balance = parseFloat(user.balance);
    const value = parseFloat(transaction.value);

    if(transaction.type === "credit"){
      balance += value;
    }

    if(transaction.type === "debit"){
      if(balance && (balance >= value) ){
        balance -= value;
      }else{
        console.log("Não há saldo suficiente");
        res.sendStatus(500);
        return;
      }
    }

    await transactionsCollection.insertOne(transaction);
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { balance: balance } }
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } 

}

export async function findTransactions(req, res) {
  const user = req.user;

  try {

    const transactions = await transactionsCollection.find({ userId: user._id}).sort({ date: -1 }).toArray();

    const result = {
      transactions: transactions,
      balance: user.balance
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } 
  res.sendStatus(201)
}

