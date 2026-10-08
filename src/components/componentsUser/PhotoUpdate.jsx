import React, { useState, useEffect } from "react";

const PhotoUpdate = ({ onClose }) => {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  // Limpa as URLs quando o componente for desmontado (evita memory leak)
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const validFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      alert("Por favor, selecione apenas imagens!");
      return;
    }

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o reload da página

    // Aqui você pode enviar os dados para o backend no futuro
    alert("Brevemente irá receber um email de resposta da nossa equipe");
    
    onClose(); // Fecha o modal depois de enviar
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-xl">
        
        {/* Botão fechar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none transition cursor-pointer"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Título */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload de Fotos</h2>
            <p className="text-sm text-gray-500 mt-1">
              Adicione imagens e preencha as informações do imóvel
            </p>
          </div>

          {/* Área de upload */}
          <div>
            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-1 text-sm text-gray-600">
                  <span className="font-semibold text-orange-500">
                    Clique para selecionar
                  </span>{" "}
                  ou arraste fotos
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG ou WEBP (máx. 5MB)
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Pré-visualização ({previews.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {previews.map((src, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-sm shadow"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dados do utilizador */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
              Dados do Utilizador
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  name="nameUser"
                  placeholder="Digite o seu nome..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="seuemail@gmail.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Senha forte com caracteres especiais"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Sobre o imóvel */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
              Sobre o Imóvel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tipologia
                </label>
                <input
                  type="text"
                  name="tipologia"
                  placeholder="Ex: T1, T2, T3, terreno, apartamento..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  placeholder="Mais informações sobre o imóvel..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl cursor-pointer bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-2.5 rounded-xl cursor-pointer bg-orange-500 text-white font-medium hover:bg-orange-600 transition shadow-sm hover:shadow-md"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoUpdate;