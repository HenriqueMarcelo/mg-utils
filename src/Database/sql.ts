import { conectionVemovel } from "./connection"

export type Sql = {
    NomeSQL: string
    SQL: string
    OBS: string
}

export async function getAllSqls() {
    try {
        const sqls = await conectionVemovel.query('SELECT * FROM [SQL]')
        return sqls
    } catch (error) {
        console.error("Database query error:", error)
        throw error
    }
}