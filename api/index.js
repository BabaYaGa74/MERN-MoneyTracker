const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const transactionRoutes = require("./routes/transactionRoutes");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", transactionRoutes);

app.listen(4000, () => console.log("server is running"));
