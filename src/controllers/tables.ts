import { NextFunction, Request, Response } from "express"
import AppError from "../utils/AppError"

import z from "zod"
import knex from "../database/knex";

export default class TablesController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const tables = await knex<TableRepository>("tables")
                .select()
            return response.json({ tables }).status(200)
        } catch (error) {
            next(error)
        }
    }
}