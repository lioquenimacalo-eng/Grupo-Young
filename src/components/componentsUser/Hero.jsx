import SearchBox from "./SearchBox";

// Secção principal no topo da página, com título e imagem de fundo

function Hero() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-8 bg-linear-to-r from-orange-500 to-orange-300 px-10 py-16 text-white">
        <div className="flex-1 min-w-70">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre o imóvel ideal em Luanda
          </h1>
          <p className="text-lg opacity-90">
            Arrendamento rápido, seguro e sem complicações.
          </p>
        </div>

        <img
        src="./public/9pNra.jpg"
          alt="Casa moderna"
          className="flex-1 min-w-70 max-w-125 w-full rounded-2xl"
        />
      </div>

      {/* A caixa de pesquisa fica por cima, entre o Hero e o resto da página */}
      <SearchBox />
    </div>
  );
}

export default Hero;
