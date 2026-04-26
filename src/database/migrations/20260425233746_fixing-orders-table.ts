import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("orders", (table) => {
        table.integer("session_id").notNullable().references("id").inTable("sessions")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("orders", (table) => {
        table.dropForeign("session_id")
        table.dropColumn("session_id")
    })
}

