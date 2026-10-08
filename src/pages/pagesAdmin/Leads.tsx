
import { Eye, CircleOff, UserRoundCheck } from 'lucide-react';
import Searche from '../../components/componentsAdmin/search';
import TabelaLeads from '../../components/componentsAdmin/TabelaLeads';

export default function Leads() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-[#e75100c8] text-white w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Eye size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Leads</p>
              <p className="text-3xl font-bold text-gray-800">410</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-[#0abb24ab] text-white w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UserRoundCheck size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Convertidos</p>
              <p className="text-3xl font-bold text-green-600">129</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition">
            <div className="bg-red-400 text-white w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CircleOff size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Perdidos</p>
              <p className="text-3xl font-bold text-red-500">+9%</p>
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="flex justify-end mb-5">
          <Searche />
        </div>

        {/* TABELA - Com padding reduzido */}
        <div className="mx-1 md:-mx-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <TabelaLeads />
          </div>
        </div>

      </div>
    </div>
  );
}