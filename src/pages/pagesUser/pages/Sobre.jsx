import React from 'react';
import Layout from "../../../components/componentsUser/Layout";
const SobreNos = () => {
  return (
      <Layout>
    <div className="font-sans overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center bg-linear-to-br from-orange-700 via-orange-600 to-orange-800 text-white">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/1920/1080')] bg-cover bg-center opacity-25"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-20">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Logo */}
            <img 
              src="/src/components/young.png" 
              alt="Grupo Young" 
              className="w-52 mb-8 drop-shadow-2xl"
            />
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              Sobre o Grupo Young
            </h1>
            
            <p className="text-2xl text-orange-100 max-w-2xl">
              Mais do que uma imobiliária, somos a ponte entre sonhos e realizações no mercado imobiliário de Luanda.
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* MISSÃO • VISÃO • VALORES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            
            {/* Missão */}
            <div className="group">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-3xl flex items-center justify-center text-5xl font-bold mb-8 transition-transform group-hover:scale-110">
                A
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-5">Missão</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Prestar serviços imobiliários com excelência, transparência e inovação, 
                oferecendo soluções completas para clientes, investidores e parceiros, 
                contribuindo para o desenvolvimento sustentável do mercado imobiliário angolano.
              </p>
            </div>

            {/* Visão */}
            <div className="group">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-3xl flex items-center justify-center text-5xl font-bold mb-8 transition-transform group-hover:scale-110">
                B
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-5">Visão</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ser reconhecida como uma das empresas imobiliárias mais respeitadas e inovadoras de Angola, 
                tornando-se a referência nacional em qualidade, tecnologia, atendimento e resultados.
              </p>
            </div>

            {/* Valores */}
            <div className="group">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-3xl flex items-center justify-center text-5xl font-bold mb-8 transition-transform group-hover:scale-110">
                C
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-5">Valores</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-lg text-gray-600">
                <div>✓ Excelência</div>
                <div>✓ Transparência</div>
                <div>✓ Inovação</div>
                <div>✓ Confiança</div>
                <div>✓ Responsabilidade</div>
                <div>✓ Integridade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILOSOFIA / NOSSA DIFERENÇA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            O nosso compromisso vai muito além da venda
          </h2>
          
          <div className="space-y-8 text-left text-lg leading-relaxed text-gray-700">
            <p>
              No <span className="font-semibold text-orange-600">Grupo Young</span> acreditamos que vender um imóvel é apenas uma parte do nosso trabalho.
            </p>
            <p>
              O nosso verdadeiro compromisso é compreender profundamente as necessidades de cada cliente, 
              apresentar soluções adequadas, prestar uma consultoria de excelência e acompanhar todo o processo com total responsabilidade.
            </p>
            <p className="text-2xl font-semibold text-gray-800 pt-6 border-t border-gray-200">
              Não queremos ser apenas mais uma imobiliária.<br />
              Queremos ser a referência nacional em profissionalismo, inovação e confiança.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-linear-to-r from-orange-600 to-orange-700 py-20 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Faça parte desta jornada
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Estamos prontos para ajudar a realizar o seu próximo grande projeto imobiliário.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contacto" 
              className="bg-white text-orange-600 px-10 py-5 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all active:scale-95"
            >
              Falar Connosco
            </a>
            <a 
              href="/imoveis" 
              className="border-2 border-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/10 transition-all active:scale-95"
            >
              Explorar Imóveis
            </a>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default SobreNos;