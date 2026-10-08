import { Zap, Shield, MapPin, DollarSign } from "lucide-react";

const beneficios = [
  { 
    icone: <Zap size={24} />, 
    titulo: "Rápido", 
    texto: "Encontre o imóvel ideal em poucos minutos." 
  },
  { 
    icone: <Shield size={24} />, 
    titulo: "Seguro", 
    texto: "Processo transparente e 100% confiável." 
  },
  { 
    icone: <MapPin size={24} />, 
    titulo: "Boa localização", 
    texto: "Imóveis nas melhores zonas de Luanda." 
  },
  { 
    icone: <DollarSign size={24} />, 
    titulo: "Melhor preço", 
    texto: "As melhores opções com preços acessíveis." 
  },
];

function Features() {
  return (
    <div className="flex flex-wrap gap-8 px-6 md:px-10 py-12 justify-center md:justify-between bg-gray-50">
      {beneficios.map((item, index) => (
        <div 
          key={index} 
          className="flex gap-5 flex-1 min-w-60 max-w-[320px] group"
        >
          <div className="bg-orange-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
            {item.icone}
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-2 text-gray-800">
              {item.titulo}
            </h4>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              {item.texto}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Features;