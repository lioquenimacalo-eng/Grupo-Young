import { Link } from "react-router-dom";
import { 
  Home, 
  Building2, 
  Info, 
  Phone 
} from "lucide-react";

export default function Menu({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const menus = [
    { nome: "Início", caminho: "/", icon: <Home size={24} /> },
    { nome: "Imóveis", caminho: "/imoveis", icon: <Building2 size={24} /> },
    { nome: "Sobre", caminho: "/sobre", icon: <Info size={24} /> },
    { nome: "Contacto", caminho: "/contacto", icon: <Phone size={24} /> }
  ];

  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm">
        {menus.map((item, index) => (
          <Link
            key={index}
            to={item.caminho}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors font-medium py-1"
            onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
          >
            <span className="text-orange-500">{item.icon}</span>
            {item.nome}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 pt-20 px-6">
          <div className="flex flex-col gap-6 text-lg">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.caminho}
                className="flex items-center gap-4 text-gray-700 hover:text-orange-500 transition-colors py-3 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-orange-500">{item.icon}</span>
                {item.nome}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}