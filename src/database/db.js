import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient("mongodb://localhost:27017");

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWallet");
export const usersCollection = db.collection("users");
export const transactionsCollection = db.collection("transactions");
export const sessionsCollection = db.collection("sessions");
