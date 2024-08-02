import React, { useEffect, useState } from "react";

export function Home() {
    const [grupos, setGrupos] = useState<any[]>([]);
    const [idGrupo, setIdGrupo] = useState<number | undefined>(undefined);
    const [descricao, setDescricao] = useState('');
    const [posicao, setPosicao] = useState(0);
    const [familia, setFamilia] = useState(0);
    const [foto, setFoto] = useState('');
    const [dataAtu, setDataAtu] = useState(new Date().toISOString().split('T')[0]);

    async function fetchData() {
        try {
            const ret2 = await window.versions.grupos();
            setGrupos(ret2);
        } catch (error) {
            console.error('Error querying database:', error);
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            if (idGrupo === undefined) {
                console.error('ID do grupo é obrigatório.');
                return;
            }

            await window.versions.insertGrupo(idGrupo, descricao, posicao, familia, foto, dataAtu);
            fetchData();  // Atualiza a lista após a inserção
        } catch (error) {
            console.error('Error inserting into database:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-primary text-4xl font-bold mb-6">Lista de Grupos</h1>

            <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Inserir Novo Grupo</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID do Grupo</label>
                        <input 
                            type="number" 
                            value={idGrupo || ''}
                            onChange={(e) => setIdGrupo(parseInt(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <input 
                            type="text" 
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Posição</label>
                        <input 
                            type="number" 
                            value={posicao}
                            onChange={(e) => setPosicao(parseInt(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Família</label>
                        <input 
                            type="number" 
                            value={familia}
                            onChange={(e) => setFamilia(parseInt(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Foto</label>
                        <input 
                            type="text" 
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data de Atualização</label>
                        <input 
                            type="date" 
                            value={dataAtu}
                            onChange={(e) => setDataAtu(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button 
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Inserir
                        </button>
                    </div>
                </div>
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Descrição</th>
                            <th className="px-4 py-2 border-b">Posição</th>
                            <th className="px-4 py-2 border-b">Família</th>
                            <th className="px-4 py-2 border-b">Foto</th>
                            <th className="px-4 py-2 border-b">Data Atualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupos.map((grupo: any) => (
                            <tr key={grupo.idGrupo} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">{grupo.idGrupo}</td>
                                <td className="px-4 py-2 border-b">{grupo.Descricao.trim()}</td>
                                <td className="px-4 py-2 border-b text-center">{grupo.Posicao}</td>
                                <td className="px-4 py-2 border-b text-center">{grupo.Familia}</td>
                                <td className="px-4 py-2 border-b">{grupo.Foto.trim()}</td>
                                <td className="px-4 py-2 border-b">{new Date(grupo.DataAtu).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
