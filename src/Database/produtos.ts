import connection from "./connection";

export async function getAllProdutos () {
    try {
        const produtos = await connection.query('SELECT * FROM Produtos');
        return produtos;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

export async function getAllGrupos () {
    try {
        const grupos = await connection.query('SELECT * FROM Grupo');
        return grupos;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

export async function insertGrupo(idGrupo: any, descricao: any, posicao: any, familia: any, foto: any, dataAtu: any) {
    try {
        await connection.execute(`
            INSERT INTO Grupo (idGrupo, Descricao, Posicao, Familia, Foto, DataAtu)
            VALUES ('${idGrupo}', '${descricao}', ${posicao}, ${familia}, '${foto}', '${dataAtu}')
        `);
        return { success: true };
    } catch (error) {
        console.error('Database insert error:', error);
        throw error;
    }
}
