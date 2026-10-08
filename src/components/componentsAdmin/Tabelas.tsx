import { Eye } from "lucide-react";

const casas = [
  {
    id: 1,
    nome: "Apartamento T2-Talatona rua 12",
    tipo: "Venda",
    preco: 300000,
    status: "vendido",
    corretor: "Antonio Luiz - 926547234",
    imagem: "/ggg.png",
    visitas: 380,
  },
  {
    id: 2,
    nome: "Benfica",
    preco: 420000,
    status: "Destaque",
    tipo: "Aluguer",
    corretor: "Carlos Mendes - 923000111",
    imagem: "/ggg.png",
    visitas: 40,
  },
  {
    id: 3,
    nome: "Condomínio Cajueiro",
    preco: 120000,
    status: "Limitado",
    tipo: "Venda",
    corretor: "João Pedro - 925111222",
    imagem: "/ggg.png",
    visitas: 25, // adicionei um valor exemplo
  },
];

export default function TabelasGeral() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cabeçalho da Tabela */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <Eye className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-slate-800">Imóveis Mais Vistos</h3>
          <p className="text-sm text-slate-500">Ranking das propriedades com maior engajamento</p>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-600">Imóvel</th>
              <th className="px-6 py-4 text-right font-medium text-gray-600">Visitas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {casas.map((casa) => (
              <tr key={casa.id} className="hover:bg-gray-50 transition-all duration-200">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={casa.imagem}
                      alt={casa.nome}
                      className="w-16 h-14 object-cover rounded-xl shadow-sm"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{casa.nome}</p>
                      <p className="text-sm text-slate-500">{casa.corretor}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl font-semibold">
                    {casa.visitas}
                    <span className="text-xs font-normal">visitas</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}