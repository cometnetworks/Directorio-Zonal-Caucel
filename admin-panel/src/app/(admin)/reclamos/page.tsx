
import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../AdminLayout";
import ReclamosTable from "./ReclamosTable";

export default function ReclamosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h1>Gestión de Reclamos</h1>
        <ReclamosTable />
      </AdminLayout>
    </ProtectedRoute>
  );
}
