import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "../AdminLayout";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h1>Panel de Administración</h1>
      </AdminLayout>
    </ProtectedRoute>
  );
}
