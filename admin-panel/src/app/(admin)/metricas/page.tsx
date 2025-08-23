
import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../AdminLayout";
import MetricasPanel from "./MetricasPanel";

export default function MetricasPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h1>Métricas y Estadísticas</h1>
        <MetricasPanel />
      </AdminLayout>
    </ProtectedRoute>
  );
}
