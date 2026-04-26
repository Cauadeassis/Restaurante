type ProductRepository = {
    id: number
    name: string
    price: number
    created_at: number
    updated_at: number
}

type OrderRepository = {
    id: number
    product_id: number
    session_id: number
    created_at: number
    updated_at: number
}

type TableRepository = {
    id: number
    number: number
    created_at: number
    updated_at: number
}

type SessionRepository = {
    id: number
    table_id: number
    opened_at: number
    closed_at: number
}