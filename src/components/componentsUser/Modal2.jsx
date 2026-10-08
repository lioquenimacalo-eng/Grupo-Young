import React from 'react';
import { motion} from "framer-motion";
import { X } from "lucide-react";
import { useState } from 'react';

function Modal2({isOpen, onClose}) {
const ButtomVisita="w-full sm:w-auto cursor-pointer px-8 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition shadow-sm hover:shadow-md"
  const Cancelar="w-full sm:w-auto cursor-pointer px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"

              const fechar=" top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600"


    
  return (
    <div>
      
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="w-[95%] max-w-2xl bg-white rounded-2xl overflow-y-auto no-scrollbar p-6 md:p-8 relative shadow-xl">
            
            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className={fechar}
            >
              <X size={24} />
            </button>
      
            {/* Conteúdo do Tutorial */}
            <div className="flex flex-col items-center text-center">
              
              {/* Título */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-3">
                Solicite uma Visita
              </h2>
      
              {/* Texto explicativo */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-lg mb-6">
                Estamos quase lá! Para marcar uma visita, precisamos de algumas informações básicas. 
                No próximo passo, você irá preencher o seu <strong>nome</strong>, <strong>email</strong>, 
                <strong>senha do email</strong> e o seu <strong>telemóvel</strong>. 
                Esses dados são necessários para confirmarmos a sua solicitação e entrarmos em contacto consigo.
              </p>
      
              {/* Ilustração Flat Art de Biblioteca */}
              <div className="w-full max-w-sm my-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
                  alt="Biblioteca"
                  className="w-1/2 h-auto object-contain mx-auto drop-shadow-sm"
                />
                {/* Alternativa mais "Facebook style" (descomente se preferir): */}
                {/* <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/library-illustration-download-in-svg-png-gif-file-formats--bookstore-books-reading-pack-education-illustrations-2923024.png"
                  alt="Biblioteca Flat"
                  className="w-full h-auto object-contain mx-auto"
                /> */}
              </div>
      
              <p className="text-gray-500 text-sm mt-2 mb-8">
                Depois de preencher os dados, a nossa equipa irá analisar o pedido e contactá-lo 
                para agendar a melhor data e horário da visita.
              </p>
      
              {/* Botões */}
              <div className="flex justify-end flex-col sm:flex-row gap-3 w-full max-w-sm">
                <button
                  className={ButtomVisita}
                  onClick={() => {
                    onClose() 
                 isOpen()
                  }}
                >
                  Seguinte
                </button>
      
                <button
                  onClick={ onClose}
                  className={Cancelar}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      
    </div>
  );
};

export default Modal2;