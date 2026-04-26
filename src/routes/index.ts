import { Router } from "express";
import productsRoutes from "./products";
import tablesRoutes from "./tables";
import sessionsRoutes from "./sessions";
import ordersRoutes from "./orders";
const routes = Router()
routes.use("/products", productsRoutes)
routes.use("/tables", tablesRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/orders", ordersRoutes)
export default routes