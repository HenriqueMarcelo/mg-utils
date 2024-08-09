import { Sql } from "./Database/sql";

interface Versions {
    node: () => string;
    chrome: () => string;
    electron: () => string;
    query: () => Promise<string[]>;
    grupos: () => Promise<string[]>;
    insertGrupo: (idGrupo, descricao, posicao, familia, foto, dataAtu) => Promise<string[]>;
    sqls: () => Promise<Sql[]>;
    updateSql: (sql: Sql) => Promise<void>;
  }

declare global {
    interface Window {
      versions:Versions;
    }
}

  