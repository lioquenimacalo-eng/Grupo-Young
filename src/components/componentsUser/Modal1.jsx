import React, { useState } from "react";
import SuccessModal from "./SuccessModal";

export default function Modal1({ onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senhaEmail: "",
    telemovel: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    setShowSuccessModal(true);
  };

  // ============================================
  // Se o modal de sucesso estiver aberto,
  // mostra APENAS ele (o formulário desaparece)
  // ============================================
  if (showSuccessModal) {
    return (
      <SuccessModal
        onClose={() => {
          setShowSuccessModal(false);
          onClose(); // fecha também o Modal1 no componente pai
        }}
      />
    );
  }

  // ============================================
  // Caso contrário, mostra o formulário normal
  // ============================================
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[95%] max-w-md bg-white rounded-xl overflow-y-auto no-scrollbar p-6 shadow-xl">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Formulário de visitas
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: João Silva"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: joao@email.com"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Senha do Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha do Email</label>
            <input
              type="password"
              name="senhaEmail"
              value={formData.senhaEmail}
              onChange={handleChange}
              placeholder="Digite a senha do email"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Telemóvel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Telemóvel</label>
            <input
              type="tel"
              name="telemovel"
              value={formData.telemovel}
              onChange={handleChange}
              placeholder="Ex: 912 345 678"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-xl transition mt-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}