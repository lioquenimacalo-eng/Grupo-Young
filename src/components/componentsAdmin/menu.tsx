import { Link } from "react-router-dom";
import { Handshake, HousePlus, LayoutDashboard, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Menu() {
  const [marcado, setMarcado] = useState(null);

  function clicar(index) {
    if (marcado === index) {
      setMarcado(null);
    } else {
      setMarcado(index);
    }
  }

  return (
    <nav className="text-white h-full w-full z-auto mt-8 text-right">
      <ul className="space-y-4 text-[16.5px] flex flex-col">

        {/* Panorama Geral */}
        <li
          onClick={() => clicar(0)}
          className={
            marcado === 0
              ? "w-full bg-[#ff7300f4] transition duration-300 pb-4 pt-2 rounded-l-xl ml-5"
              : "w-full mb-6 text-[17px] ml-5"
          }
        >
          <Link
            to="/admin/panorama-geral"
            className="flex justify-start items-center gap-3 w-full p-2"
          >
            <LayoutDashboard size={24} />
            <span>Panorama Geral</span>
          </Link>
        </li>

        {/* Imóveis */}
        <li
          onClick={() => clicar(1)}
          className={
            marcado === 1
              ? "w-full bg-[#ff7300f4] transition duration-300 pb-4 pt-2 rounded-l-xl ml-5"
              : "w-full mb-6 text-[17px] ml-5"
          }
        >
          <Link
            to="/admin/imoveis"
            className="flex justify-start items-center gap-3 w-full p-2"
          >
            <HousePlus size={27} />
            <span>Imóveis</span>
          </Link>
        </li>

        {/* Leads */}
        <li
          onClick={() => clicar(2)}
          className={
            marcado === 2
              ? "w-full bg-[#ff7300f4] transition duration-300 pb-2 pt-2 rounded-l-xl ml-5"
              : "w-full text-[17px] ml-5"
          }
        >
          <Link
            to="/admin/leads"
            className="flex justify-start items-center gap-3 w-full p-2"
          >
            <UserPlus size={27} />
            <span>Leads</span>
          </Link>
        </li>

        {/* Pedidos de parceiros */}
        <li
          onClick={() => clicar(3)}
          className={
            marcado === 3
              ? "w-full bg-[#ff7300f4] transition duration-300 pb-2 pt-2 rounded-l-xl ml-5"
              : "w-full mb-6 text-[17px] ml-5"
          }
        >
          <Link
            to="/admin/asksParceiros"
            className="flex justify-start items-center gap-3 w-full p-2"
          >
            <Handshake size={27} />
            <span>Pedidos de parceiros</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
}