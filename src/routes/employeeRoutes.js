import { createEmployee, loginEmployee } from "../controller/employeeController.js"
import express from "express"

const router = express.Router()


router.route("/create").post(createEmployee)
router.route("/login").post(loginEmployee)


export default router