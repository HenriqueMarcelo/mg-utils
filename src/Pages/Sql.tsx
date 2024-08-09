import { FormEvent, useEffect, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { MdModeEditOutline, MdDeleteForever, MdCancel } from 'react-icons/md'
import { Sql as SqlType } from '../Database/sql'
import { FaSave } from 'react-icons/fa'

export function Sql() {
  const [sqls, setSqls] = useState<SqlType[]>([])
  const [sqlBeingEdited, setSqlBeingEdited] = useState<string | undefined>()

  async function fetchData() {
    try {
      const ret = await window.versions.sqls()
      setSqls(ret)
    } catch (error) {
      console.error('Erro querying database:', error)
    }
  }

  function handleEdit(nome: string) {
    setSqlBeingEdited(nome)
  }

  async function handleSave(event: FormEvent<HTMLFormElement>, nome: string) {
    event.preventDefault() // Impede o comportamento padrão de submissão

    // Obtém todos os elementos do formulário
    const form = event.currentTarget
    const formData = new FormData(form)

    // Ou para acessar valores específicos
    const NomeSQL = formData.get('NomeSQL')
    const OBS = formData.get('OBS')
    const SQL = formData.get('SQL')

    const sqlObj = { NomeSQL: sqlBeingEdited, OBS, SQL } as SqlType

    await updateSql(sqlObj)

    fetchData()

    setSqlBeingEdited(undefined)
  }

  async function updateSql(sql: SqlType) {
    try {
      await window.versions.updateSql(sql)
    } catch (error) {
      console.error('Erro querying database:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log('render')
  return (
    <div className="p-6">
      <h1 className="text-primary text-4xl font-bold mb-6">Sql</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-left	">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nome</th>
              <th className="px-4 py-2 border-b">Descrição</th>
              <th className="px-4 py-2 border-b">Comando</th>
              <th className="px-4 py-2 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sqls.map((sql) => {
              const isEdditing = sqlBeingEdited === sql.NomeSQL
              return (
                <tr key={sql.NomeSQL} className="hover:bg-gray-100 text-left">
                  <form
                    className="hidden"
                    onSubmit={(e) => handleSave(e, sql.NomeSQL)}
                    id={sql.NomeSQL}
                    onReset={() => setSqlBeingEdited(undefined)}
                  ></form>
                  <td className="px-4 py-2 border-b">
                    <input
                      name="NomeSQL"
                      defaultValue={sql.NomeSQL}
                      disabled={true /*It's our primary key*/}
                      className="w-full bg-transparent border border-gray-300 p-2 disabled:border-transparent rounded font-mono	"
                      form={sql.NomeSQL}
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      name="OBS"
                      defaultValue={sql.OBS}
                      disabled={!isEdditing}
                      className="w-full bg-transparent border border-gray-300 p-2 disabled:border-transparent rounded font-mono	"
                      form={sql.NomeSQL}
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      name="SQL"
                      defaultValue={sql.SQL}
                      disabled={!isEdditing}
                      className="w-full bg-transparent border border-gray-300 p-2 disabled:border-transparent rounded font-mono	"
                      form={sql.NomeSQL}
                    />
                  </td>
                  <td className="px-4 py-2 border-b whitespace-nowrap text-center">
                    {isEdditing ? (
                      <>
                        <button className="hidden" />
                        <button className="hidden" />
                        <button
                          type="submit"
                          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-2 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          onClick={() => handleEdit(sql.NomeSQL)}
                          form={sql.NomeSQL}
                        >
                          <FaSave />
                        </button>
                        <button
                          type="reset"
                          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          form={sql.NomeSQL}
                        >
                          <MdCancel />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm p-2 text-center me-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                          onClick={() => setSqlBeingEdited(sql.NomeSQL)}
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm p-2 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          <MdDeleteForever />
                        </button>
                        <button
                          type="button"
                          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-2 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          <IoPlay />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
