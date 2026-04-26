import { Router } from "express"
import TablesController from "../controllers/tables"

const tablesRoutes = Router()
const tablesController = new TablesController()
tablesRoutes.get("/", tablesController.index)
export default tablesRoutes