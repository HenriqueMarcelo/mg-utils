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

export async function updateSql(sql: Sql) {
    try {
        // const comando = `UPDATE SQL SET OBS = "${sql.OBS}", SQL = "${sql.SQL}" WHERE NomeSQL = "${sql.NomeSQL}"`
        // const comando = `UPDATE [SQL] SET OBS = '${sql.OBS}', [SQL] = '${sql.SQL}' WHERE NomeSQL =  '${sql.NomeSQL}`
        const comando = `UPDATE [SQL] SET OBS = '${sql.OBS}', [SQL] = '${sql.SQL}' WHERE NomeSQL =  '${sql.NomeSQL}'`
        console.log(comando)
        const sqls = await conectionVemovel.execute(comando)
        return sqls
    } catch (error) {
        console.error("Database query error:", error)
        throw error
    }
}