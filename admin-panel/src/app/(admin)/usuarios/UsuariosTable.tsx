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
      {loading && <div style={{ color: "var(--text-dark)", padding: "16px" }}>Cargando...</div>}
      {error && <div style={{ color: "var(--accent)", backgroundColor: "var(--neutral)", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>{error}</div>}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "var(--text-light)",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <thead>
          <tr style={{ backgroundColor: "var(--primary)", color: "var(--text-light)" }}>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>ID</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Email</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Nombre</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Rol</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Fecha de registro</th>
            <th style={{ padding: "12px", textAlign: "left", fontWeight: "bold" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, index) => (
            <tr key={u.id} style={{
              backgroundColor: index % 2 === 0 ? "var(--neutral)" : "var(--text-light)",
              borderBottom: "1px solid var(--neutral)"
            }}>
              <td style={{ padding: "12px", color: "var(--text-dark)" }}>{u.id}</td>
              <td style={{ padding: "12px", color: "var(--text-dark)" }}>{u.email}</td>
              <td style={{ padding: "12px", color: "var(--text-dark)" }}>{u.name}</td>
              <td style={{ padding: "12px", color: "var(--text-dark)" }}>{u.role}</td>
              <td style={{ padding: "12px", color: "var(--text-dark)" }}>{new Date(u.created_at).toLocaleString()}</td>
              <td style={{ padding: "12px" }}>
                <button
                  onClick={() => setDetalleId(u.id)}
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--text-light)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    marginRight: "8px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Ver
                </button>
                <button
                  onClick={() => handleRole(u.id, "admin")}
                  disabled={u.role === "admin"}
                  style={{
                    backgroundColor: u.role === "admin" ? "var(--neutral)" : "var(--accent)",
                    color: u.role === "admin" ? "var(--text-dark)" : "var(--primary)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    marginRight: "8px",
                    cursor: u.role === "admin" ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  Hacer admin
                </button>
                <button
                  onClick={() => handleRole(u.id, "user")}
                  disabled={u.role === "user"}
                  style={{
                    backgroundColor: u.role === "user" ? "var(--neutral)" : "var(--primary)",
                    color: u.role === "user" ? "var(--text-dark)" : "var(--text-light)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    marginRight: "8px",
                    cursor: u.role === "user" ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  Hacer usuario
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--text-light)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarios.length === 0 && !loading && (
        <div style={{
          textAlign: "center",
          padding: "40px",
          color: "var(--text-dark)",
          backgroundColor: "var(--neutral)",
          borderRadius: "8px",
          marginTop: "20px"
        }}>
          No hay usuarios registrados.
        </div>
      )}
      {detalleId && (
        <UsuarioDetalleModal usuarioId={detalleId} onClose={() => setDetalleId(null)} />
      )}
    </div>
  );
}
