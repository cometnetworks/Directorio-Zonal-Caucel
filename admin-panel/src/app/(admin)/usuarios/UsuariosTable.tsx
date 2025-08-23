"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UsuarioDetalleModal from "./UsuarioDetalleModal";

interface Usuario {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

export default function UsuariosTable() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detalleId, setDetalleId] = useState<number | null>(null);
  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se pudo eliminar");
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const fetchUsuarios = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar usuarios");
      const data = await res.json();
      setUsuarios(data.users || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    // eslint-disable-next-line
  }, [token]);

  const handleRole = async (id: number, role: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar el rol");
      setUsuarios((prev) => prev.map(u => u.id === id ? { ...u, role } : u));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Fecha de registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => setDetalleId(u.id)} style={{ marginRight: 8 }}>Ver</button>
                <button onClick={() => handleRole(u.id, "admin")} disabled={u.role === "admin"}>
                  Hacer admin
                </button>
                <button onClick={() => handleRole(u.id, "user")} disabled={u.role === "user"} style={{ marginLeft: 8 }}>
                  Hacer usuario
                </button>
                <button onClick={() => handleDelete(u.id)} style={{ color: 'red', marginLeft: 8 }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarios.length === 0 && !loading && <div>No hay usuarios.</div>}
      {detalleId && (
        <UsuarioDetalleModal usuarioId={detalleId} onClose={() => setDetalleId(null)} />
      )}
    </div>
  );
}
