import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../AdminLayout";
import ResenasTable from "./ResenasTable";

export default function ResenasPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h1>Administración de Reseñas</h1>
        <ResenasTable />
      </AdminLayout>
    </ProtectedRoute>
  );
}
