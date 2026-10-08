import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import MenuItems from "./menu";
import Logo from "./logo";

export default function Sidebar() {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  return (
    <>
    {/*====SIDEBAR PARA MOBILE */}
      {/* Botão */}
      <button
        onClick={() => setSidebarAberta(!sidebarAberta)}
        className="fixed top-4 left-4 z-50 p-2 bg-[#f35b09] cursor-pointer text-white rounded md:hidden"
      >
        {sidebarAberta ? <X size={24} /> : <Menu size={24} />}
      </button>


      <AnimatePresence>

        {sidebarAberta && (
          <>
            {/* Fundo clicável */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarAberta(false)}
              className="fixed inset-0 z-30 bg-black"
            />


            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              className="fixed top-0 left-0 z-40 w-64 h-[200vh] bg-[#f35b09]  overflow-hidden md:hidden"
            >

              <div className="pt-16">
                <Logo />

                <div className="pt-10 flex flex-col items-center w-full">
                  <MenuItems />
                </div>

              </div>

            </motion.aside>

          </>
        )}

      </AnimatePresence>

{/*===SIDE BAR PARA PC */}

 <aside
              
              className="fixed top-0 left-0  w-64 h-[200vh] bg-[#f35b09]  overflow-hidden hidden sm:block"
            >

              <div className="pt-16">
                <Logo />

                <div className="pt-10 flex flex-col items-center w-full">
                  <MenuItems />
                </div>

              </div>

            </aside>




    </>
  );
}