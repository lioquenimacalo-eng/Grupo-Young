import { useState, useMemo } from "react";
import Layout from "../../../components/componentsUser/Layout";
import PropertyCard from "../../../components/componentsUser/PropertyCard";
import imoveis from "../../../data/dataUser/imoveis";

function Imoveis() {
  const [produtoSelecionado,setProdutoSelecionado]=useState(null);

  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState({
    tipo: "todos", // aluguel | compra
    precoMin: "",
    precoMax: "",
    quartos: "todos",
    localizacao: "",
  });

  const imoveisFiltrados = useMemo(() => {
    return imoveis.filter((imovel) => {
      // Barra de busca (título, localização ou descrição)
      const termo = busca.toLowerCase().trim();
      if (termo) {
        const textoCompleto = `
          ${imovel.titulo || ""} 
          ${imovel.localizacao || ""} 
          ${imovel.descricao || ""}
        `.toLowerCase();

        if (!textoCompleto.includes(termo)) {
          return false;
        }
      }

      // Tipo (Aluguel ou Compra)
      if (filtros.tipo !== "todos" && imovel.tipo !== filtros.tipo) {
        return false;
      }

      // Preço mínimo
      if (filtros.precoMin && imovel.preco < Number(filtros.precoMin)) {
        return false;
      }

      // Preço máximo
      if (filtros.precoMax && imovel.preco > Number(filtros.precoMax)) {
        return false;
      }

      // Quartos
      if (filtros.quartos !== "todos" && imovel.quartos < Number(filtros.quartos)) {
        return false;
      }

      // Localização (busca parcial)
      if (
        filtros.localizacao &&
        !imovel.localizacao
          ?.toLowerCase()
          .includes(filtros.localizacao.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [busca, filtros]);

  const limparFiltros = () => {
    setBusca("");
    setFiltros({
      tipo: "todos",
      precoMin: "",
      precoMax: "",
      quartos: "todos",
      localizacao: "",
    });
  };

  return (
    <Layout>
      <section className="px-10 pt-14 pb-6">
        

        {/* Barra de Busca (estilo Home) */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Pesquisar por título, localização ou palavra-chave..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl pl-12 pr-4 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Tipo: Aluguel ou Compra */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                value={filtros.tipo}
                onChange={(e) =>
                  setFiltros({ ...filtros, tipo: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="todos">Todos</option>
                <option value="aluguel">Aluguel</option>
                <option value="compra">Compra</option>
              </select>
            </div>

            {/* Preço Mínimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço Mínimo
              </label>
              <input
                type="number"
                placeholder="Ex: 50000"
                value={filtros.precoMin}
                onChange={(e) =>
                  setFiltros({ ...filtros, precoMin: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Preço Máximo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço Máximo
              </label>
              <input
                type="number"
                placeholder="Ex: 500000"
                value={filtros.precoMax}
                onChange={(e) =>
                  setFiltros({ ...filtros, precoMax: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Quartos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quartos
              </label>
              <select
                value={filtros.quartos}
                onChange={(e) =>
                  setFiltros({ ...filtros, quartos: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="todos">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Localização */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localização
              </label>
              <input
                type="text"
                placeholder="Cidade ou bairro..."
                value={filtros.localizacao}
                onChange={(e) =>
                  setFiltros({ ...filtros, localizacao: e.target.value })
                }
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={limparFiltros}
              className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        </div>

        {/* Lista de imóveis */}
        {imoveisFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {imoveisFiltrados.map((imovel) => (
          <PropertyCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Nenhum imóvel encontrado com esses filtros.
            </p>
            <button
              onClick={limparFiltros}
              className="mt-4 text-orange-500 font-bold hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}

       


      </section>
</Layout>
  );
}

export default Imoveis;