// src/global.d.ts
interface Versions {
    node: () => string;
    chrome: () => string;
    electron: () => string;
    query: () => Promise<string[]>;
    grupos: () => Promise<string[]>;
    insertGrupo: (idGrupo, descricao, posicao, familia, foto, dataAtu) => Promise<string[]>;
  }
  
  interface Window {
    versions: Versions;
  }
  