import { Check, Trash2 } from "lucide-react";

interface NomeCliente {
  completo: string;
  avatar: string | null;
  iniciais: string;
}

interface Contactos {
  telefone: string;
  email: string;
}

interface ImovelDesejado {
  nome: string;
  imagem: string;
  preco: number;
}

interface DataSubmissao {
  dia: number;
  mes: number;
  ano: number;
  hora: number;
  minuto: number;
}

interface Cliente {
  nome: NomeCliente;
  contactos: Contactos;
  imovelDesejado: ImovelDesejado;
  data: DataSubmissao;
}

// Array tipado
const clientes: Cliente[] = [
  {
    nome: {
      completo: "João Manuel",
      avatar: "https://i.pravatar.cc/150?img=1",
      iniciais: "JM"
    },
    contactos: {
      telefone: "+244 923 456 789",
      email: "joao.manuel@email.com"
    },
    imovelDesejado: {
      nome: "Apartamento T3 em Talatona",
      imagem: "https://picsum.photos/400/300?random=1",
      preco: 85000000
    },
    data: {
      dia: 6,
      mes: 6,
      ano: 2026,
      hora: 9,
      minuto: 45
    }
  },
  {
    nome: {
      completo: "Maria Fernandes",
      avatar: null,
      iniciais: "MF"
    },
    contactos: {
      telefone: "+244 945 123 456",
      email: "maria.fernandes@email.com"
    },
    imovelDesejado: {
      nome: "Moradia T4 em Benfica",
      imagem: "https://picsum.photos/400/300?random=2",
      preco: 120000000
    },
    data: {
      dia: 5,
      mes: 6,
      ano: 2026,
      hora: 16,
      minuto: 30
    }
  },
  {
    nome: {
      completo: "Carlos Miguel",
      avatar: "https://i.pravatar.cc/150?img=3",
      iniciais: "CM"
    },
    contactos: {
      telefone: "+244 933 987 654",
      email: "carlos.miguel@email.com"
    },
    imovelDesejado: {
      nome: "Terreno 20x30 em Viana",
      imagem: "https://picsum.photos/400/300?random=3",
      preco: 25000000
    },
    data: {
      dia: 4,
      mes: 6,
      ano: 2026,
      hora: 11,
      minuto: 15
    }
  },
  {
    nome: {
      completo: "Ana Paula",
      avatar: null,
      iniciais: "AP"
    },
    contactos: {
      telefone: "+244 928 654 321",
      email: "ana.paula@email.com"
    },
    imovelDesejado: {
      nome: "Apartamento T2 em Kilamba",
      imagem: "https://picsum.photos/400/300?random=4",
      preco: 65000000
    },
    data: {
      dia: 3,
      mes: 6,
      ano: 2026,
      hora: 14,
      minuto: 50
    }
  }
];

export default function TabelaLeads() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse bg-white min-w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-5 text-left font-semibold text-gray-700">Nome</th>
            <th className="px-6 py-5 text-left font-semibold text-gray-700">Contactos</th>
            <th className="px-6 py-5 text-left font-semibold text-gray-700">Imóvel</th>
            <th className="px-6 py-5 text-left font-semibold text-gray-700">Data</th>
            <th className="px-6 py-5 text-right font-semibold text-gray-700">Ações</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {clientes.map((cliente, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Nome */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  {cliente.nome.avatar ? (
                    <img
                      src={cliente.nome.avatar}
                      alt={cliente.nome.completo}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center text-sm">
                      {cliente.nome.iniciais}
                    </div>
                  )}
                  <span className="font-medium text-gray-800">{cliente.nome.completo}</span>
                </div>
              </td>

              {/* Contactos */}
              <td className="px-6 py-5">
                <div>
                  <p className="font-medium text-gray-800">{cliente.contactos.telefone}</p>
                  <p className="text-sm text-gray-500">{cliente.contactos.email}</p>
                </div>
              </td>

              {/* Imóvel */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <img
                    src={cliente.imovelDesejado.imagem}
                    alt={cliente.imovelDesejado.nome}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800 leading-tight">
                      {cliente.imovelDesejado.nome}
                    </p>
                    <p className="text-green-600 font-semibold mt-1">
                      {cliente.imovelDesejado.preco.toLocaleString()} Kz
                    </p>
                  </div>
                </div>
              </td>

              {/* Data */}
              <td className="px-6 py-5 text-gray-600">
                <div>
                  {cliente.data.dia}/{cliente.data.mes}/{cliente.data.ano}
                  <br />
                  <span className="text-sm">
                    {cliente.data.hora}:{cliente.data.minuto.toString().padStart(2, "0")}
                  </span>
                </div>
              </td>

              {/* Ações */}
              <td className="px-6 py-5 text-right">
                <div className="flex justify-end gap-3">
                  <button className="p-3 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 transition">
                    <Check size={20} />
                  </button>
                  <button className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}