import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

// PÁGINAS PÚBLICAS
import Home from "./pages/pagesUser/pages/Home";
import Publicar from "./pages/pagesUser/pages/Publicar";
import Sobre from "./pages/pagesUser/pages/Sobre";
import Contacto from "./pages/pagesUser/pages/Contacto";
import ImoveisPublicos from "./pages/pagesUser/pages/Imoveis";

// PÁGINAS ADMIN
import Login from "./pages/pagesAdmin/Login";
import PanoramaGeral from "./pages/pagesAdmin/PanoramaGeral";
import ImoveisAdmin from "./pages/pagesAdmin/Imoveis";
import Leads from "./pages/pagesAdmin/Leads";
import AsksParceiros from "./pages/pagesAdmin/AsksParceiros";
// ===============================
// COMPONENTES ADMIN
// ===============================
import Sidebar from "./components/componentsAdmin/Sidebar";
import PageTransition from "./components/componentsAdmin/PageTransition";
import ProtectedRoute from "./components/componentsAdmin/ProtectedRoute";



// ===============================
// CSS
// ===============================
import "./App.css";
import "./index.css";

// ==========================================
// LAYOUT DO ADMIN
// ==========================================
function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="w-full md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

// ==========================================
// ROTAS
// ==========================================
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ==================================
            SITE PÚBLICO
        ================================== */}
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<ImoveisPublicos />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* ==================================
            LOGIN ADMIN
        ================================== */}
        <Route
          path="/admin/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        {/* ==================================
            ADMIN PROTEGIDO
        ================================== */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Redireciona /admin → /admin/panorama-geral */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/panorama-geral" replace />}
          />

          <Route
            path="/admin/panorama-geral"
            element={
              <PageTransition>
                <PanoramaGeral />
              </PageTransition>
            }
          />

          <Route
            path="/admin/imoveis"
            element={
              <PageTransition>
                <ImoveisAdmin />
              </PageTransition>
            }
          />

          <Route
            path="/admin/leads"
            element={
              <PageTransition>
                <Leads />
              </PageTransition>
            }
          />

          <Route
            path="/admin/asksParceiros"
            element={
              <PageTransition>
                <AsksParceiros />
              </PageTransition>
            }
          />
        </Route>

        {/* ==================================
            ROTA NÃO ENCONTRADA
        ================================== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

// ==========================================
// APP
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}