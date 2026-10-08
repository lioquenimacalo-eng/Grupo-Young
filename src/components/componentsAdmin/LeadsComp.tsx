import { useState } from "react";

export default function Leads() {

  const [mostrarTodos, setMostrarTodos] = useState(false);

  const usuarios = [
    {
      id: 1,
      nome: "João Manuel",
      contacto: "923456781",
      foto: ""
    },
    {
      id: 2,
      nome: "Ana Sousa",
      contacto: "921234567",
      foto: ""
    },
    {
      id: 3,
      nome: "Pedro Costa",
      contacto: "925987654",
      foto: ""
    },
    {
      id: 4,
      nome: "Maria Lima",
      contacto: "924567891",
      foto: ""
    },
    {
      id: 5,
      nome: "Fernando Ramos",
      contacto: "926111222",
      foto: ""
    },
    {
      id: 6,
      nome: "Carlos Bento",
      contacto: "927333444",
      foto: ""
    },
    {
      id: 7,
      nome: "Lucia Gomes",
      contacto: "928555666",
      foto: ""
    },
    {
      id: 8,
      nome: "Mateus Silva",
      contacto: "929777888",
      foto: ""
    }
  ];

  // pega apenas 6 se mostrarTodos for false
  const usuariosVisiveis = mostrarTodos
    ? usuarios
    : usuarios.slice(0, 3);

  return (
    <div className="bg-white p-5 rounded-2xl w-87.5 text-gray-700">

      <h1 className="text-xl font-bold mb-5">
        Leads recentes
      </h1>

      <div className="space-y-4">

        {usuariosVisiveis.map((usuario) => {

          // pega as iniciais
          const iniciais = usuario.nome
            .split(" ")
            .map((palavra) => palavra[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (

            <div
              key={usuario.id}
              className="flex items-center gap-3"
            >

              {/* AVATAR */}
              <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center overflow-hidden text-white font-bold">

                {usuario.foto ? (

                  <img
                    src={usuario.foto}
                    className="w-full h-full object-cover"
                  />

                ) : (
                  iniciais
                )}

              </div>

              {/* TEXTO */}
              <div>

                <h2 className="font-semibold">
                  {usuario.nome}
                </h2>

                <p className="text-sm text-gray-500">
                  {usuario.contacto}
                </p>

              </div>

            </div>

          );
        })}

      </div>

      {/* BOTÃO */}
      {usuarios.length > 6 && (

        <button
          onClick={() =>
            setMostrarTodos(!mostrarTodos)
          }
          className="mt-5 text-orange-500 font-semibold"
        >

          {mostrarTodos
            ? "Mostrar menos"
            : "Mostrar mais"}

        </button>

      )}

    </div>
  );
}