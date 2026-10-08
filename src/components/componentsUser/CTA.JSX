import { FaWhatsapp } from "react-icons/fa";

function CTA({ onOpenModal }) {
  return (
    <div className="bg-linear-to-r from-orange-500 to-orange-300 rounded-2xl text-white px-10 py-12 mx-10 my-10">
      <div className="max-w-lg">
        <h2 className="text-3xl font-bold mb-1">Tem um imóvel?</h2>
        <h3 className="text-2xl mb-3">Comece a ganhar hoje!</h3>
        <p className="mb-6 opacity-90">
          Publique seu imóvel e alcance milhares de pessoas.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={onOpenModal}   // ← só chama a função que vem do pai
            className="bg-white text-orange-500 font-bold px-5 py-3 rounded-lg hover:bg-gray-100"
          >
            + PUBLICAR IMÓVEL
          </button>


<button className="border-2 border-white text-white font-bold px-5 py-3 rounded-lg
  flex items-center gap-2
  hover:bg-white/10
  animate-whatsapp-pulse">
  <FaWhatsapp size={30} />
  FALAR NO WHATSAPP
</button>
        </div>
      </div>
    </div>
  );
}

export default CTA;