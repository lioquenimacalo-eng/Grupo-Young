import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FadeDown from "./FadeDown";
import { motion } from "framer-motion";

export default function Typssearch() {
  const [ativoTipo, setAtivoTipo] = useState<number | null>(null);
  const [ativoStatus, setAtivoStatus] = useState<number | null>(null);

  const tipoRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function clicado() {
    alert("Eu fui clicado!");
    setAtivoTipo(null);
    setAtivoStatus(null);
  }

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        tipoRef.current &&
        !tipoRef.current.contains(event.target as Node) &&
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setAtivoTipo(null);
        setAtivoStatus(null);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  // Classes comuns para os 3 botões
  const buttonClass =
    "px-5 py-2.5 text-gray-700 border border-gray-300 border-opacity-25 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-all duration-200 min-w-[140px] sm:min-w-[160px]";

  const chevronClass = "ml-2 transition-transform duration-200";

  return (
    <>
      {/* ===== DESKTOP ===== */}
      <div className="gap-4 hidden ml-14 sm:flex">
        {/* Dropdown Tipos */}
        <div className="relative" ref={tipoRef}>
          <button
            onClick={() => {
              setAtivoTipo(ativoTipo === 1 ? null : 1);
              setAtivoStatus(null);
            }}
            className={buttonClass}
          >
            Todos os tipos
            <ChevronDown
              className={chevronClass}
              style={{ transform: ativoTipo === 1 ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          <FadeDown>
            {ativoTipo === 1 && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden py-1"
              >
                {["Venda", "Aluguer", "Arrendamento"].map((item) => (
                  <button
                    key={item}
                    onClick={clicado}
                    className="w-full text-left px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
                  >
                    {item}
                  </button>
                ))}
              </motion.ul>
            )}
          </FadeDown>
        </div>

        {/* Dropdown Status */}
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => {
              setAtivoStatus(ativoStatus === 1 ? null : 1);
              setAtivoTipo(null);
            }}
            className={buttonClass}
          >
            Todos os status
            <ChevronDown
              className={chevronClass}
              style={{ transform: ativoStatus === 1 ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          <FadeDown>
            {ativoStatus === 1 && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden py-1"
              >
                {["Todos", "Ativo", "Suspenso", "Vendido", "Alugado"].map((item) => (
                  <button
                    key={item}
                    onClick={clicado}
                    className="w-full text-left px-5 py-2.5 text-gray-700 hover:bg-gray-100 transition"
                  >
                    {item}
                  </button>
                ))}
              </motion.ul>
            )}
          </FadeDown>
        </div>

        {/* Localizações */}
        <button className={buttonClass}>
          Todas as localizações
          <ChevronDown className={chevronClass} />
        </button>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="flex gap-3 ml-5 sm:hidden">
        {/* Tipos Mobile */}
        <div className="relative" ref={tipoRef}>
          <button
            onClick={() => {
              setAtivoTipo(ativoTipo === 1 ? null : 1);
              setAtivoStatus(null);
            }}
            className={buttonClass.replace("min-w-[140px] sm:min-w-[160px]", "min-w-[110px]")}
          >
            Tipos
            <ChevronDown
              className={chevronClass}
              style={{ transform: ativoTipo === 1 ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {ativoTipo === 1 && (
            <ul className="absolute mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden py-1">
              {["Venda", "Aluguer", "Arrendamento"].map((item) => (
                <button
                  key={item}
                  onClick={clicado}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </ul>
          )}
        </div>

        {/* Status Mobile */}
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => {
              setAtivoStatus(ativoStatus === 1 ? null : 1);
              setAtivoTipo(null);
            }}
            className={buttonClass.replace("min-w-[140px] sm:min-w-[160px]", "min-w-[110px]")}
          >
            Status
            <ChevronDown
              className={chevronClass}
              style={{ transform: ativoStatus === 1 ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {ativoStatus === 1 && (
            <ul className="absolute mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden py-1">
              {["Todos", "Ativo", "Suspenso", "Vendido", "Alugado"].map((item) => (
                <button
                  key={item}
                  onClick={clicado}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </ul>
          )}
        </div>

        {/* Localizações Mobile */}
        <button className={buttonClass.replace("min-w-[140px] sm:min-w-[160px]", "min-w-[110px]")}>
          Localizações
          <ChevronDown className={chevronClass} />
        </button>
      </div>
    </>
  );
}