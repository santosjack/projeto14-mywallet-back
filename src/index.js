import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import transactionsRoutes from "./routes/transactions.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoutes);
app.use(transactionsRoutes);


app.listen(5000, () => console.log(`Server running in port: 5000`));