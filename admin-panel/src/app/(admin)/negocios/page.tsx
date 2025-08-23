
import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../AdminLayout";
import NegociosTable from "./NegociosTable";

export default function NegociosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h1>Gestión de Negocios</h1>
        <NegociosTable />
      </AdminLayout>
    </ProtectedRoute>
  );
}
