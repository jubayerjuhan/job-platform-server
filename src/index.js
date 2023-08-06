import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import connectDb from "./db/database.js";
import errorCatcherMiddleWare from "./middlewares/errorCatcherMiddleware.js"
import cors from "cors"

// routes
import employeeRoutes from "./routes/employeeRoutes.js";


const app = express()
app.use(cors());
app.use(bodyParser.json());

// connection to database
connectDb();

app.use("/employee",employeeRoutes)

app.listen(4000, () => {
  console.log("App Listening On Port 4000")
})


app.use(errorCatcherMiddleWare);
