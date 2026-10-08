import { useState } from "react";
import { MapPin, Bed, Bath, Square, X } from "lucide-react";
import { motion} from "framer-motion";
import Modal1 from "./Modal1";
import Modal2 from './Modal2';
function PropertyCard({ imovel }) {
  //estados dos modais e de cada imovel selecionado
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modal2,setModal2]= useState(false);
  const [modal1,setModal1]=useState(false)

    const [formData, setFormData] = useState({
      nome: '',
      email: '',
      senhaEmail: '',
      telemovel: '',
    })
  
  
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Dados do formulário:', formData)
      // Aqui você pode enviar os dados para a API
    }
  
 
  //estilos super repetitivos

  const fechar=" top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600"
  const Cancelar="w-full sm:w-auto cursor-pointer px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
const ButtomVisita="w-full sm:w-auto cursor-pointer px-8 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition shadow-sm hover:shadow-md"


  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all duration-300">
      <div className="relative">
        <img
          src={imovel.imagem}
          alt={imovel.tipo}
          className="w-full h-52 object-cover block"
        />
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
          {imovel.tag}
        </span>
      </div>

      <div className="p-5">
        <p className="text-orange-500 font-bold text-2xl mb-1">{imovel.preco}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{imovel.tipo}</h3>

        <p className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin size={18} className="text-orange-500" />
          {imovel.localizacao}
        </p>

        <div className="flex gap-5 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1.5">
            <Bed size={20} className="text-gray-500" />
            <span>{imovel.quartos} Quartos</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath size={20} className="text-gray-500" />
            <span>{imovel.wc} WC</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Square size={20} className="text-gray-500" />
            <span>{imovel.area} m²</span>
          </div>
        </div>

        <button
          onClick={() => setProdutoSelecionado(imovel)}
          className="w-full py-3.5 cursor-pointer border border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-50 hover:border-orange-600 transition-all"
        >
          VER DETALHES
        </button>
      </div>

      {/* ===== MODAL FORA DO BOTÃO ===== */}
      {produtoSelecionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-[95%] max-w-4xl h-[90vh] bg-white rounded-xl overflow-y-auto no-scrollbar p-6">
            {/* Botão de fechar */}
            <button
              onClick={() => setProdutoSelecionado(null)}
              className={fechar}
            >
              <X size={24} />
            </button>

            <img
              src={produtoSelecionado.imagem}
              alt={produtoSelecionado.tipo}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <p className="text-orange-500 font-bold text-2xl mb-1">
              {produtoSelecionado.preco}
            </p>
            <h3 className="font-semibold text-xl mb-2">
              {produtoSelecionado.tipo}
            </h3>

            <p className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <MapPin size={18} className="text-orange-500" />
              {produtoSelecionado.localizacao}
            </p>

            <div className="flex gap-5 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1.5">
                <Bed size={18} />
                <span>{produtoSelecionado.quartos} Quartos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath size={18} />
                <span>{produtoSelecionado.wc} WC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square size={18} />
                <span>{produtoSelecionado.area} m²</span>
              </div>
            </div>

            {/* Descrição e outras informações */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {produtoSelecionado.descricao}
            </p>
          <div className="w-full  grid gap grid-cols-3  pt-2.5">    
{
  produtoSelecionado?.imagens?.map((imagem,index)=>(

    <img key={index}
    src={imagem}
    alt={produtoSelecionado.nome}
    className="w-30 h-30 rounded-lg"
    />
  ))
}
  </div>
  <div className="flex gap-1.5 mt-5">

  <button 

   onClick={() =>{ 
      setProdutoSelecionado(null)
setModal2(true)
     }
     }

    className={ButtomVisita}>Solicitar visita</button>

    <button     
     onClick={() =>{ 
      setProdutoSelecionado(null)

     }
     }
className={Cancelar}
>Cancelar </button>

          </div>
          </div>
        </div>
      )}

      {/*====SEGUNDO MODAL(o da descrição)======*/}
      {modal2 && (
<Modal2
onClose={()=>setModal2(false)
}
 
  isOpen={()=>setModal1(true)}
/>

      )}


{
  modal1 && <Modal1 onClose={()=>setModal1(false)
} />
}
    </div>
  );
}

export default PropertyCard;