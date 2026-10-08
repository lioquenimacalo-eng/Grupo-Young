import { Search, MapPin, Home, DollarSign, Building2, ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

function CustomDropdown({ label, icon: Icon, options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="flex flex-col relative">
      <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-2">
        <Icon size={18} className="text-orange-500" />
        {label}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 rounded-2xl border border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-left font-medium bg-white flex items-center justify-between transition-all"
        >
          <span className={value ? "text-gray-700" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            size={20} 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="px-6 py-3 hover:bg-orange-50 cursor-pointer flex items-center justify-between text-gray-700 hover:text-orange-600 transition-colors"
              >
                <span>{option.label}</span>
                {value === option.value && <Check size={18} className="text-orange-500" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchBox() {
  const [filters, setFilters] = useState({
    negocio: '',
    tipo: '',
    localizacao: '',
    precoMax: ''
  });

  const handleChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Filtros aplicados:", filters);
  };

  // Opções dos dropdowns
  const negocioOptions = [
    { value: '', label: 'Compra ou Aluguel' },
    { value: 'venda', label: 'Comprar' },
    { value: 'aluguel', label: 'Alugar' },
  ];

  const tipoOptions = [
    { value: '', label: 'Todos os tipos' },
    { value: 'Apartamento', label: 'Apartamento' },
    { value: 'Moradia', label: 'Moradia' },
    { value: 'Terreno', label: 'Terreno' },
    { value: 'Comercial', label: 'Comercial' },
  ];

  const localizacaoOptions = [
    { value: '', label: 'Qualquer localização' },
    { value: 'Talatona', label: 'Talatona' },
    { value: 'Belas', label: 'Belas' },
    { value: 'Kilamba', label: 'Kilamba' },
    { value: 'Luanda Sul', label: 'Luanda Sul' },
    { value: 'Maianga', label: 'Maianga' },
  ];

  const precoOptions = [
    { value: '', label: 'Sem limite' },
    { value: '300000', label: '300.000 Kz' },
    { value: '500000', label: '500.000 Kz' },
    { value: '800000', label: '800.000 Kz' },
    { value: '1200000', label: '1.200.000 Kz' },
    { value: '2000000', label: '2.000.000 Kz' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 -mt-10 md:-mt-14 relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-end">
          
          <CustomDropdown
            label="NEGÓCIO"
            icon={Building2}
            options={negocioOptions}
            value={filters.negocio}
            onChange={(value) => handleChange('negocio', value)}
            placeholder="Compra ?"
          />

          <CustomDropdown
            label="TIPO DE IMÓVEL"
            icon={Home}
            options={tipoOptions}
            value={filters.tipo}
            onChange={(value) => handleChange('tipo', value)}
            placeholder="Todos os tipos"
          />

          <CustomDropdown
            label="LOCALIZAÇÃO"
            icon={MapPin}
            options={localizacaoOptions}
            value={filters.localizacao}
            onChange={(value) => handleChange('localizacao', value)}
            placeholder=" localização"
          />

          <CustomDropdown
            label="PREÇO MÁXIMO"
            icon={DollarSign}
            options={precoOptions}
            value={filters.precoMax}
            onChange={(value) => handleChange('precoMax', value)}
            placeholder="Sem limite"
          />

          <button
            onClick={handleSearch}
            className="w-full lg:w-auto h-[56px] cursor-pointer bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-2xl hover:-translate-y-1 mt-auto"
          >
            <Search size={26} />
            <span>BUSCAR AGORA</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default SearchBox;