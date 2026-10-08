import { useState } from "react";


const pedidosParceiros = [
  {
    id: 1,
    parceiro: {
      nome: "João Manuel",
      idade: 28,
      contacto: "+244 923 456 789",
      email: "joao.manuel@email.com",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    imovel: {
      nome: "Apartamento T3 em Talatona",
      tipo: "Apartamento",
      localizacao: "Talatona, Luanda",
      imagem: "https://picsum.photos/400/300?random=1",
      descricao:
        "Apartamento moderno com cozinha equipada, varanda e segurança 24h.",
      expectativaPreco: 85000000
    },
    estado: "pendente",
    dataSubmissao: "2026-06-08T10:30:00"
  },

  {
    id: 2,
    parceiro: {
      nome: "Maria Fernandes",
      idade: 32,
      contacto: "+244 945 123 456",
      email: "maria.fernandes@email.com",
      avatar: null
    },
    imovel: {
      nome: "Moradia T4 em Benfica",
      tipo: "Moradia",
      localizacao: "Benfica, Luanda",
      imagem: "https://picsum.photos/400/300?random=2",
      descricao:
        "Moradia espaçosa com quintal, garagem para 2 carros e piscina.",
      expectativaPreco: 120000000
    },
    estado: "pendente",
    dataSubmissao: "2026-06-07T15:20:00"
  },

  {
    id: 3,
    parceiro: {
      nome: "Carlos Miguel",
      idade: 35,
      contacto: "+244 933 987 654",
      email: "carlos.miguel@email.com",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    imovel: {
      nome: "Terreno 20x30 em Viana",
      tipo: "Terreno",
      localizacao: "Viana, Luanda",
      imagem: "https://picsum.photos/400/300?random=3",
      descricao:
        "Terreno plano ideal para construção residencial ou comercial.",
      expectativaPreco: 25000000
    },
    estado: "pendente",
    dataSubmissao: "2026-06-06T11:10:00"
  },

  {
    id: 4,
    parceiro: {
      nome: "Ana Paula",
      idade: 30,
      contacto: "+244 928 654 321",
      email: "ana.paula@email.com",
      avatar: null
    },
    imovel: {
      nome: "Apartamento T2 no Kilamba",
      tipo: "Apartamento",
      localizacao: "Kilamba, Luanda",
      imagem: "https://picsum.photos/400/300?random=4",
      descricao:
        "Apartamento com boa iluminação, segurança e estacionamento.",
      expectativaPreco: 65000000
    },
    estado: "pendente",
    dataSubmissao: "2026-06-05T14:40:00"
  },

  {
    id: 5,
    parceiro: {
      nome: "Pedro Santos",
      idade: 40,
      contacto: "+244 924 111 222",
      email: "pedro.santos@email.com",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    imovel: {
      nome: "Vivenda T5 na Ilha de Luanda",
      tipo: "Vivenda",
      localizacao: "Ilha de Luanda",
      imagem: "https://picsum.photos/400/300?random=5",
      descricao:
        "Vivenda de luxo com vista mar, piscina e acabamentos premium.",
      expectativaPreco: 300000000
    },
    estado: "pendente",
    dataSubmissao: "2026-06-04T09:00:00"
  }
];
export default function MARIA() {
  const [selecionado, setSelecionado] = useState(pedidosParceiros[0]);

  return (
    <div className="flex h-screen bg-gray-50 w-full ">

      {/* LISTA (ESQUERDA) */}
      <div className="w-1/2 border-r-opacity-50  bg-white overflow-y-auto">

        {pedidosParceiros.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelecionado(p)}
            className={`p-4 flex gap-3 cursor-pointer border-b-opacity-60 hover:bg-gray-100 ${
              selecionado.id === p.id ? "bg-gray-200" : ""
            }`}
          >

            {/* AVATAR OU INICIAIS */}
            {p.parceiro.avatar ? (
              <img
                src={p.parceiro.avatar}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                {p.parceiro.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}

            {/* INFO */}
            <div>
              <p className="font-semibold">{p.parceiro.nome}</p>
              <p className="text-xs text-gray-500">
                {p.imovel.nome}
              </p>
              <p className="text-xs text-gray-500">
                {p.imovel.expectativaPreco.toLocaleString()} Kz
              </p>

              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                {p.estado}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* DETALHE (DIREITA) */}
      <div className="w-full p-6 ">

        {/* IMAGEM IMÓVEL */}
        <img
          src={selecionado.imovel.imagem}
          className="w-full h-72 object-cover rounded-xl"
        />

        <h2 className="text-2xl font-bold mt-4">
          {selecionado.imovel.nome}
        </h2>

        <p className="text-gray-600 mt-2">
          {selecionado.imovel.descricao}
        </p>

        <p className="mt-2 font-semibold text-lg">
          {selecionado.imovel.expectativaPreco.toLocaleString()} Kz
        </p>

        {/* PARCEIRO */}
        <div className="mt-6 p-4 bg-white rounded-xl border-opacity-80">

          <div className="flex items-center gap-3">

            {/* AVATAR OU INICIAIS */}
            {selecionado.parceiro.avatar ? (
              <img
                src={selecionado.parceiro.avatar}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                {selecionado.parceiro.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}

            <div>
              <p className="font-semibold">
                {selecionado.parceiro.nome}
              </p>
              <p className="text-sm text-gray-500">
                {selecionado.parceiro.contacto}
              </p>
              <p className="text-sm text-gray-500">
                {selecionado.parceiro.email}
              </p>
            </div>
          </div>
        </div>

        {/* AÇÕES */}
        <div className="flex gap-4 mt-6">

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Aprovar
          </button>

          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
            Rejeitar
          </button>

        </div>
      </div>

    </div>
  );
}