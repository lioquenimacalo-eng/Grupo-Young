import { useState } from 'react';
import Menu from './Menu';
import PhotoUpdate from './PhotoUpdate';
import { PlusCircle, Menu as MenuIcon, X } from "lucide-react";

function Navbar({ isOpen, onOpen, onClose }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-5 md:px-8">
        {/* Logo */}
        <div className="font-bold text-2xl leading-none">
          <span className="text-orange-500">Grupo</span>
          <br />
          YOUNG
        </div>

        {/* Menu Desktop + Mobile */}
        <Menu 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />

        {/* Botão Publicar (Desktop) */}
        <button 
          onClick={onOpen}
          className="hidden md:flex bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl items-center gap-2 transition-all active:scale-95"
        >
          <PlusCircle size={22} />
          PUBLICAR IMÓVEL
        </button>

        {/* Hamburger Button */}
        <button 
          className="md:hidden text-gray-700 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Botão Publicar Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-6">
          <button 
            onClick={onOpen}
            className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <PlusCircle size={24} />
            PUBLICAR IMÓVEL
          </button>
        </div>
      )}

      {/* Modal */}
      {isOpen && <PhotoUpdate onClose={onClose} />}
    </nav>
  );
}

export default Navbar;