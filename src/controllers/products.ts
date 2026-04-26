import { NextFunction, Request, Response } from "express"
import AppError from "../utils/AppError"

import z from "zod"
import knex from "../database/knex";

export default class ProductsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.query
            const products = await knex<ProductRepository>("products")
                .select()
                .whereLike("name", `%${name ?? ""}%`)
            return response.json({ products }).status(200)
        } catch (error) {
            next(error)
        }
    }
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().trim(),
                price: z.number().gt(0, { message: "Preço deve ser maior do que 0" })
            })
            const { name, price } = bodySchema.parse(request.body);
            await knex<ProductRepository>("products").insert({ name, price })
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

            const product = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()
            if (!product) {
                throw new AppError("product not found")
            }
            const bodySchema = z.object({
                name: z.string().trim(),
                price: z.number().gt(0, { message: "Preço deve ser maior do que 0" })
            })

            const { name, price } = bodySchema.parse(request.body);
            await knex<ProductRepository>("products")
                .update({ name, price, updated_at: knex.fn.now() })
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

            const product = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()
            if (!product) {
                throw new AppError("product not found")
            }

            await knex<ProductRepository>("products")
                .delete()
                .where({ id })

            return response.json().status(200)
        } catch (error) {
            next(error)
        }
    }
}