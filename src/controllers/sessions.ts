import { NextFunction, Request, Response } from "express"
import AppError from "../utils/AppError"

import z from "zod"
import knex from "../database/knex";

export default class SessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.coerce.number(),
            })
            const { table_id } = bodySchema.parse(request.body)
            await knex<SessionRepository>("sessions").insert({ table_id })
            return response.status(201).json({ message: "Criado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "Id deve ser numérico" })
                .parse(request.params.id)

            const session = await knex<SessionRepository>("sessions")
                .select()
                .where({ id })
                .first()
            if (!session) {
                throw new AppError("session not found")
            }

            await knex<SessionRepository>("sessions")
                .delete()
                .where({ id })

            return response.json().status(200)
        } catch (error) {
            next(error)
        }
    }
}