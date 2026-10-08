import { Trash2, SquarePen, X, HousePlus } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Types from "./typs-search";

// ====================== TIPOS ======================
type Imovel = {
  id: number;
  nome: string;
  localizacao: string;
  tipo: "Venda" | "Aluguer";
  preco: number;
  quartos: number;
  wc: number;
  tamanho: number;
  description: string;
  status: "vendido" | "Destaque" | "Limitado";
  corretor: string;
  imagemPrincipal: string;
  imagens: string[];
};

const IMOVEL_VAZIO: Imovel = {
  id: 0,
  nome: "",
  localizacao: "",
  tipo: "Venda",
  preco: 0,
  quartos: 0,
  wc: 0,
  tamanho: 0,
  description: "",
  status: "Destaque",
  corretor: "",
  imagemPrincipal: "",
  imagens: [],
};

// ====================== FORMULÁRIO REUTILIZÁVEL ======================
// Antes: os campos do formulário estavam duplicados no modal de "adicionar"
// (que nem existia) e no modal de "editar". Agora ambos usam este mesmo
// componente, então qualquer ajuste de campo é feito num único lugar.
interface ImovelFormProps {
  form: Imovel;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onPrincipalUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onExtraUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveExtra: (index: number) => void;
}

function ImovelForm({ form, onChange, onPrincipalUpload, onExtraUpload, onRemoveExtra }: ImovelFormProps) {
  return (
    <>
      {/* Imagens */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Imagem Principal</label>
          {form.imagemPrincipal && (
            <img
              src={form.imagemPrincipal}
              alt="Principal"
              className="w-full h-52 object-cover rounded-2xl border border-gray-200 shadow-sm"
            />
          )}
          <input type="file" accept="image/*" onChange={onPrincipalUpload} className="mt-3 w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Outras Imagens</label>
          <input type="file" multiple accept="image/*" onChange={onExtraUpload} className="w-full" />
          <div className="flex flex-wrap gap-4 mt-4">
            {form.imagens.map((img, index) => (
              <div key={index} className="relative group">
                <img src={img} alt="preview" className="w-28 h-28 object-cover rounded-2xl border" />
                <button
                  type="button"
                  onClick={() => onRemoveExtra(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Nome do Imóvel</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Localização</label>
          <input
            type="text"
            name="localizacao"
            value={form.localizacao}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <select name="tipo" value={form.tipo} onChange={onChange} className="w-full border border-gray-300 rounded-2xl px-5 py-3">
            <option value="Venda">Venda</option>
            <option value="Aluguer">Aluguer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço ($)</label>
          <input
            type="number"
            name="preco"
            min={0}
            value={form.preco}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quartos</label>
          <input type="number" name="quartos" min={0} value={form.quartos} onChange={onChange} className="w-full border border-gray-300 rounded-2xl px-5 py-3" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">WC</label>
          <input type="number" name="wc" min={0} value={form.wc} onChange={onChange} className="w-full border border-gray-300 rounded-2xl px-5 py-3" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tamanho (m²)</label>
          <input type="number" name="tamanho" min={0} value={form.tamanho} onChange={onChange} className="w-full border border-gray-300 rounded-2xl px-5 py-3" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Corretor</label>
          <input
            type="text"
            name="corretor"
            value={form.corretor}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-2xl px-5 py-3"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={form.status} onChange={onChange} className="w-full border border-gray-300 rounded-2xl px-5 py-3">
            <option value="Destaque">Destaque</option>
            <option value="Limitado">Limitado</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea name="description" value={form.description} onChange={onChange} rows={4} className="w-full border border-gray-300 rounded-2xl px-5 py-3" />
        </div>
      </div>
    </>
  );
}

// Converte um arquivo de imagem em base64. Rejeita arquivos > 5MB para não
// travar o navegador guardando imagens gigantes em memória/estado.
function lerImagemComoBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Imagem maior que 5MB"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = () => reject(new Error("Falha ao ler o arquivo"));
    reader.readAsDataURL(file);
  });
}

// ====================== MODAL: ADICIONAR ======================
interface ModalAdicionarProps {
  isOpen: boolean;
  onClose: () => void;
  onAdicionar: (imovel: Imovel) => void;
}

function ModalAdicionarImovel({ isOpen, onClose, onAdicionar }: ModalAdicionarProps) {
  const [form, setForm] = useState<Imovel>(IMOVEL_VAZIO);

  // Sempre que o modal abre, começa com um formulário limpo.
  useEffect(() => {
    if (isOpen) setForm(IMOVEL_VAZIO);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const numericFields = ["preco", "quartos", "wc", "tamanho"];
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handlePrincipalUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await lerImagemComoBase64(file);
      setForm((prev) => ({ ...prev, imagemPrincipal: base64 }));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleExtraUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      try {
        const base64 = await lerImagemComoBase64(file);
        setForm((prev) => ({ ...prev, imagens: [...prev.imagens, base64] }));
      } catch (err) {
        alert((err as Error).message);
      }
    }
  };

  const handleRemoveExtra = (index: number) => {
    setForm((prev) => ({ ...prev, imagens: prev.imagens.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdicionar({ ...form, id: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center border-b p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Novo Imóvel</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <ImovelForm
            form={form}
            onChange={handleChange}
            onPrincipalUpload={handlePrincipalUpload}
            onExtraUpload={handleExtraUpload}
            onRemoveExtra={handleRemoveExtra}
          />

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors">
              Adicionar Imóvel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ====================== MODAL: EDITAR ======================
interface ModalEditarProps {
  isOpen: boolean;
  onClose: () => void;
  imovel: Imovel | null;
  onSalvar: (imovelEditado: Imovel) => void;
}

function ModalEditarImovel({ isOpen, onClose, imovel, onSalvar }: ModalEditarProps) {
  const [form, setForm] = useState<Imovel | null>(null);

  // BUG CORRIGIDO: antes isto usava `useState(() => {...})`, que só executa
  // UMA vez (na primeira renderização), então trocar de imóvel a editar não
  // atualizava o formulário. Com `useEffect` dependente de `imovel`, o
  // formulário é sempre recarregado quando um imóvel diferente é selecionado.
  useEffect(() => {
    if (imovel) setForm({ ...imovel });
  }, [imovel]);

  if (!isOpen || !imovel || !form) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const numericFields = ["preco", "quartos", "wc", "tamanho"];
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: numericFields.includes(name) ? (value === "" ? 0 : Number(value)) : value,
          }
        : null
    );
  };

  const handlePrincipalUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await lerImagemComoBase64(file);
      setForm((prev) => (prev ? { ...prev, imagemPrincipal: base64 } : null));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleExtraUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      try {
        const base64 = await lerImagemComoBase64(file);
        setForm((prev) => (prev ? { ...prev, imagens: [...prev.imagens, base64] } : null));
      } catch (err) {
        alert((err as Error).message);
      }
    }
  };

  const handleRemoveExtra = (index: number) => {
    setForm((prev) => (prev ? { ...prev, imagens: prev.imagens.filter((_, i) => i !== index) } : null));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSalvar(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center border-b p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Editar Imóvel</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <ImovelForm
            form={form}
            onChange={handleChange}
            onPrincipalUpload={handlePrincipalUpload}
            onExtraUpload={handleExtraUpload}
            onRemoveExtra={handleRemoveExtra}
          />

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ====================== TABELA VAZIA ======================
function EstadoVazio() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <HousePlus size={48} className="text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700">Nenhum imóvel cadastrado</h3>
      <p className="text-sm text-gray-500 mt-1">Clique em "+ Novo Imóvel" para começar a preencher a sua carteira.</p>
    </div>
  );
}

// ====================== COMPONENTE PRINCIPAL ======================
// Dados de exemplo. Substitua por uma chamada à sua API/backend quando
// estiver pronto — este array só existe para a tabela não iniciar vazia.
const initialData: Imovel[] = [];

export default function Table() {
  const [itens, setItens] = useState<Imovel[]>(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<Imovel | null>(null);

  const handleAdicionar = (novoImovel: Imovel) => setItens((prev) => [...prev, novoImovel]);

  const editar = (id: number) => {
    const imovel = itens.find((item) => item.id === id);
    if (imovel) {
      setCurrentEdit(imovel);
      setEditModalOpen(true);
    }
  };

  const salvarEdicao = (imovelEditado: Imovel) => {
    setItens((prev) => prev.map((item) => (item.id === imovelEditado.id ? imovelEditado : item)));
    setEditModalOpen(false);
    setCurrentEdit(null);
  };

  const deletar = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este imóvel?")) {
      setItens((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex m-4 mt-6 mb-6 gap-4 w-full lg:justify-between sm:flex-row justify-center">
        <Types />
        <button
          onClick={() => setModalOpen(true)}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium hidden md:block transition-all active:scale-95"
        >
          + Novo Imóvel
        </button>
        <motion.button
          onClick={() => setModalOpen(true)}
          className="md:hidden fixed bottom-8 right-8 p-5 bg-blue-600 text-white rounded-3xl shadow-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Adicionar novo imóvel"
        >
          <HousePlus size={34} />
        </motion.button>
      </div>

      <ModalAdicionarImovel isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdicionar={handleAdicionar} />
      <ModalEditarImovel
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setCurrentEdit(null);
        }}
        imovel={currentEdit}
        onSalvar={salvarEdicao}
      />

      {/* Tabela */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {itens.length === 0 ? (
            <EstadoVazio />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-white border-b">
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600 w-20">Foto</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">Imóvel</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">Localização</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">Tipo</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">Preço</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">Detalhes</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {itens.map((imovel) => (
                    <tr key={imovel.id} className="hover:bg-blue-50/50 transition-all group">
                      <td className="px-6 py-5">
                        <div className="w-16 h-16 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-gray-100">
                          {imovel.imagemPrincipal && (
                            <img
                              src={imovel.imagemPrincipal}
                              alt={imovel.nome}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-semibold text-gray-800">{imovel.nome}</td>
                      <td className="px-6 py-5 text-gray-600">{imovel.localizacao}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-1.5 rounded-2xl text-xs font-medium ${
                            imovel.tipo === "Venda" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {imovel.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-lg text-gray-800">
                        {imovel.preco.toLocaleString()} $
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {imovel.quartos}q • {imovel.wc}wc • {imovel.tamanho}m²
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-1.5 rounded-2xl text-xs font-medium ${
                            imovel.status === "Destaque"
                              ? "bg-blue-100 text-blue-700"
                              : imovel.status === "Limitado"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {imovel.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => editar(imovel.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-2 rounded-xl transition-all"
                            title="Editar"
                          >
                            <SquarePen size={22} />
                          </button>
                          <button
                            onClick={() => deletar(imovel.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-xl transition-all"
                            title="Excluir"
                          >
                            <Trash2 size={22} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}