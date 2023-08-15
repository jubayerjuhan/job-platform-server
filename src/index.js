import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import connectDb from "./db/database.js";
import errorCatcherMiddleWare from "./middlewares/errorCatcherMiddleware.js"
import cors from "cors"

// routes
import employeeRoutes from "./routes/employeeRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";


const app = express()
app.use(cors());
app.use(bodyParser.json());

// connection to database
connectDb();

app.use("/employee",employeeRoutes)
app.use("/",employerRoutes)
app.use("/",jobRoutes)

app.listen(4000, () => {
  console.log("App Listening On Port 4000")
})


app.use(errorCatcherMiddleWare);
