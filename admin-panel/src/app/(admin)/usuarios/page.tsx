import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../AdminLayout";
import UsuariosTable from "./UsuariosTable";

export default function UsuariosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h1>Gestión de Usuarios</h1>
        <UsuariosTable />
      </AdminLayout>
    </ProtectedRoute>
  );
}
