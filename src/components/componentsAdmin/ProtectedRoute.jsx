// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
// Substitua pela sua lógica real de autenticação
const isAuthenticated =1;
if (!isAuthenticated) {
return <Navigate to="/login" replace />;
}
return children;
}