import Navbar from "./Navbar";
import Footer from "./Footer";

// O Layout é usado em todas as páginas
// Ele mostra o Navbar no topo, o Footer em baixo,
// e o conteúdo da página (children) fica no meio

function Layout({ children, isOpen, onOpen, onClose }) {
  return (
    <>
      <Navbar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      
      <main>{children}</main>
      
      <Footer />
    </>
  );
}

export default Layout;