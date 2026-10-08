import Grafico from "../../components/componentsAdmin/grafic1";
import Table from '../../components/componentsAdmin/Tabelas';
import Estatisticas from '../../components/componentsAdmin/estatisticas';

export default function PanoramaGeral() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Cabeçalho */}
        <div className="mb-12 block md:hidden">
          <h1 className="text-4xl font-semibold text-slate-800 ">
            Panorama Geral
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Visão geral do desempenho do seu negócio • Atualizada agora
          </p>
        </div>

        {/* Estatísticas */}
        <div className="mb-12">
          <Estatisticas />
        </div>

        {/* Gráfico Principal */}
        <div className="mb-12">
          <div className=" rounded-md  ">
            <Grafico />
          </div>
        </div>

        {/* Tabela */}
        <div className=" rounded-md  overflow-hidden">
          <Table />
        </div>

      </div>
    </div>
  );
}