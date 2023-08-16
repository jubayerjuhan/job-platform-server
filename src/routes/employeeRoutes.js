import { createEmployee, deleteEmployee, getAllEmployees, loginEmployee } from "../controller/employeeController.js"
import express from "express"

const router = express.Router()


router.route("/create").post(createEmployee)
router.route("/login").post(loginEmployee)
router.route("/list").get(getAllEmployees)
router.route("/delete/:id").get(deleteEmployee)


export default router