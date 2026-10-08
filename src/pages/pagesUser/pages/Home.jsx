
import { useState } from "react";

import Layout from "../../../components/componentsUser/Layout";
import Hero from "../../../components/componentsUser/Hero";
import PropertyCard from "../../../components/componentsUser/PropertyCard";
import Features from "../../../components/componentsUser/Features";
import CTA from "../../../components/componentsUser/CTA";
import imoveis from "../../../data/dataUser/imoveis";
function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <Hero />

      <section className="px-10 pt-14 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Imóveis em Destaque</h2>
          <span className="text-orange-500 font-bold cursor-pointer">
            Ver todos →
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imoveis.map((imovel) => (
            <PropertyCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </section>

      <Features />

      {/* CTA também abre o modal */}
      <CTA onOpenModal={() => setIsOpen(true)} />
    </Layout>
  );
}

export default Home;