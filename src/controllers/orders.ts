import { NextFunction, Request, Response } from "express"
import AppError from "../utils/AppError"

import z from "zod"
import knex from "../database/knex";

export default class OrdersController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const orders = await knex<OrderRepository>("orders").select()
            return response.json({ orders }).status(200)
        } catch (error) {
            next(error)
        }
    }
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                product_id: z.coerce.number(),
                session_id: z.coerce.number()
            })
            const { product_id, session_id } = bodySchema.parse(request.body);
            await knex<OrderRepository>("orders").insert({ product_id, session_id })
            return response.status(201).json({ message: "Criado com sucesso" })
        } catch (error) {
            next(error)
        }
    }
    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "Id deve ser numérico" })
                .parse(request.params.id)

            const order = await knex<OrderRepository>("orders")
                .select()
                .where({ id })
                .first()
            if (!order) {
                throw new AppError("order not found")
            }
            const bodySchema = z.object({
                product_id: z.coerce.number(),
                session_id: z.coerce.number()
            })

            const { product_id, session_id } = bodySchema.parse(request.body);
            await knex<OrderRepository>("orders")
                .update({ product_id, session_id, updated_at: knex.fn.now() })
                .where({ id })

            return response.json({ message: "Atualizado com sucesso" }).status(200)
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

            const order = await knex<OrderRepository>("orders")
                .select()
                .where({ id })
                .first()
            if (!order) {
                throw new AppError("order not found")
            }

            await knex<OrderRepository>("orders")
                .delete()
                .where({ id })

            return response.json().status(200)
        } catch (error) {
            next(error)
        }
    }
}