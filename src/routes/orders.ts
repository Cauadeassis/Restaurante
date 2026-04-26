import { Router } from "express"
import OrdersController from "../controllers/orders"

const tablesRoutes = Router()
const ordersController = new OrdersController()
tablesRoutes.get("/", ordersController.index)
tablesRoutes.post("/", ordersController.create)
tablesRoutes.put("/:id", ordersController.update)
tablesRoutes.delete("/:id", ordersController.remove)
export default tablesRoutes