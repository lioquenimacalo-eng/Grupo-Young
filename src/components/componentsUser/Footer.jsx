// Rodapé da página

function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300 flex flex-wrap gap-8 px-10 py-10">
      <div className="flex-1 min-w-[200px]">
        <div className="text-white font-bold text-lg mb-3">Grupo YOUNG</div>
        <p className="text-sm">
          A sua plataforma de confiança para arrendamento de imóveis em Luanda.
        </p>
      </div>

      <div className="flex-1 min-w-[200px]">
        <h4 className="text-white font-semibold mb-3">NAVEGAÇÃO</h4>
        <p className="text-sm my-1.5">Início</p>
        <p className="text-sm my-1.5">Imóveis</p>
        <p className="text-sm my-1.5">Sobre</p>
        <p className="text-sm my-1.5">Serviços</p>
        <p className="text-sm my-1.5">Contacto</p>
      </div>

      <div className="flex-1 min-w-[200px]">
        <h4 className="text-white font-semibold mb-3">CONTACTOS</h4>
        <p className="text-sm my-1.5">📞 +244 923 456 789</p>
        <p className="text-sm my-1.5">✉️ geral@grupoyoung.ao</p>
        <p className="text-sm my-1.5">📍 Luanda, Angola</p>
      </div>

      <div className="flex-1 min-w-[200px]">
        <h4 className="text-white font-semibold mb-3">NEWSLETTER</h4>
        <p className="text-sm mb-3">Receba as melhores ofertas no seu email.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Seu email"
            className="flex-1 px-3 py-2 rounded-md text-black"
          />
          <button className="bg-orange-500 text-white rounded-md px-4 hover:bg-orange-600">
            ➤
          </button>
        </div>
      </div>

      <p className="w-full text-center text-xs mt-6 border-t border-gray-700 pt-5">
        © 2024 Grupo Young. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
