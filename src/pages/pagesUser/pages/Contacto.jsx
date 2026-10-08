import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Layout
} from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok
} from "react-icons/fa6";
import Layouta from "../../../components/componentsUser/Layout";
function Contacto  () {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! (Simulação)");
    // Aqui podes integrar com o teu backend ou EmailJS
  };

  return (
       <Layouta>
    <div className="font-sans bg-white">
      
      {/* HERO MODERNO */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#ff6b00_0%,transparent_70%)] opacity-30"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter mb-6">
            Vamos Conversar
          </h1>
          <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">
            A sua próxima grande oportunidade imobiliária começa com uma simples conversa.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-24">
        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* FORMULÁRIO */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16">
              <h2 className="text-4xl font-semibold mb-10 text-zinc-900">Envie-nos uma mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      placeholder="João Mendes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="joao@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">Telefone</label>
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+244 923 456 789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-600 mb-2">Assunto</label>
                    <select
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="Compra">Compra de Imóvel</option>
                      <option value="Arrendamento">Arrendamento</option>
                      <option value="Venda">Venda do meu Imóvel</option>
                      <option value="Parceria">Parceria</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Mensagem</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-6 py-4 bg-zinc-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    placeholder="Descreva o que precisa..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 transition-all text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 group"
                >
                  Enviar Mensagem
                  <Send className="group-hover:translate-x-1 transition-transform" size={22} />
                </button>
              </form>
            </div>
          </div>

          {/* INFORMAÇÕES LATERAIS */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Contact Info Cards */}
            <div className="bg-zinc-900 text-white rounded-3xl p-10 space-y-10">
              <div className="flex gap-5">
                <Phone size={28} className="text-orange-500 mt-1" />
                <div>
                  <p className="text-orange-400 text-sm font-medium">TELEFONE / WHATSAPP</p>
                  <a href="tel:+244923456789" className="text-2xl hover:text-orange-400 transition-colors">+244 923 456 789</a>
                </div>
              </div>

              <div className="flex gap-5">
                <Mail size={28} className="text-orange-500 mt-1" />
                <div>
                  <p className="text-orange-400 text-sm font-medium">EMAIL</p>
                  <a href="mailto:geral@grupoyoung.ao" className="text-xl hover:text-orange-400 transition-colors">geral@grupoyoung.ao</a>
                </div>
              </div>

              <div className="flex gap-5">
                <MapPin size={28} className="text-orange-500 mt-1" />
                <div>
                  <p className="text-orange-400 text-sm font-medium">LOCALIZAÇÃO</p>
                  <p className="text-xl">Luanda, Angola</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock size={28} className="text-orange-500 mt-1" />
                <div>
                  <p className="text-orange-400 text-sm font-medium">HORÁRIO</p>
                  <p>Seg - Sex: 08h00 - 18h00<br />Sábado: 09h00 - 13h00</p>
                </div>
              </div>
            </div>

            {/* REDES SOCIAIS */}
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-6">Siga-nos nas redes</h3>
              <div className="grid grid-cols-2 gap-4">
                
                <a href="https://www.instagram.com/grupo_young_ao" target="_blank" className="flex items-center gap-4 bg-zinc-100 hover:bg-zinc-200 transition-colors p-6 rounded-3xl group">
                  <FaInstagram size={32}  className="text-zinc-800 group-hover:text-pink-600 transition-colors" />
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-zinc-500">@grupo_young_ao</p>
                  </div>
                </a>

                <a href="https://www.tiktok.com/@grupo.young.ao" target="_blank" className="flex items-center gap-4 bg-zinc-100 hover:bg-zinc-200 transition-colors p-6 rounded-3xl group">
                  <FaTiktok size={32} className="text-zinc-800 group-hover:text-black transition-colors" />
                  <div>
                    <p className="font-medium">TikTok</p>
                    <p className="text-sm text-zinc-500">@grupo.young.ao</p>
                  </div>
                </a>

                <a href="https://www.facebook.com/profile.php?id=61586371868104" target="_blank" className="flex items-center gap-4 bg-zinc-100 hover:bg-zinc-200 transition-colors p-6 rounded-3xl group">
                  <FaFacebook size={32}  className="text-zinc-800 group-hover:text-blue-600 transition-colors" />
                  <div>
                    <p className="font-medium">Facebook</p>
                    <p className="text-sm text-zinc-500">Grupo Young</p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layouta> 
  );
};

export default Contacto;