import { Router } from "express"
import SessionsController from "../controllers/sessions"

const sessionsRoutes = Router()
const sessionsController = new SessionsController()
sessionsRoutes.post("/", sessionsController.create)
sessionsRoutes.delete("/:id", sessionsController.remove)
export default sessionsRoutes