import { contextBridge, ipcRenderer } from 'electron';
import { Sql } from './Database/sql';

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  query: () => ipcRenderer.invoke('query-database'),
  grupos: () => ipcRenderer.invoke('query-database-grupos'),
  insertGrupo: (idGrupo: any, descricao: any, posicao: any, familia: any, foto: any, dataAtu: any) => ipcRenderer.invoke('insert-grupo', { idGrupo, descricao, posicao, familia, foto, dataAtu }),
  sqls: () => ipcRenderer.invoke('query-database-sqls'),
  updateSql: (sql: Sql) => ipcRenderer.invoke('update-database-sql', sql),
});
