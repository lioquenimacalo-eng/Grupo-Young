import { Eye, House, UserRoundCheck } from 'lucide-react';
import { motion } from "framer-motion";

export default function Estatisticas() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1 - Visitas */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white border border-gray-100 rounded-xl p-6 
                     shadow-md hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-start justify-between">
            <div className="p-3.5 bg-gray-100 rounded-2xl group-hover:bg-emerald-100 transition-colors">
              <Eye className="w-8 h-8 text-gray-700 group-hover:text-emerald-600 transition-colors" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-gray-900">410</p>
              <p className="text-sm text-gray-500 mt-1">Visitas</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 - Imóveis */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white border border-gray-100 rounded-xl p-6 
                     shadow-md hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-start justify-between">
            <div className="p-3.5 bg-gray-100 rounded-2xl group-hover:bg-blue-100 transition-colors">
              <House className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-gray-900">129</p>
              <p className="text-sm text-gray-500 mt-1">Imóveis</p>
            </div>
          </div>
        </motion.div>

        {/* Card 3 - Leads */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white border border-gray-100 rounded-xl p-6 
                     shadow-md hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-start justify-between">
            <div className="p-3.5 bg-gray-100 rounded-2xl group-hover:bg-amber-100 transition-colors">
              <UserRoundCheck className="w-8 h-8 text-gray-700 group-hover:text-amber-600 transition-colors" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-gray-900">+9%</p>
              <p className="text-sm text-gray-500 mt-1">Leads</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}