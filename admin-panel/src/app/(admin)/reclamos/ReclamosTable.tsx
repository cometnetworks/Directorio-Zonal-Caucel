"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ReclamoDetalleModal from "./ReclamoDetalleModal";

interface Reclamo {
  id: number;
  business_id: number;
  business_name: string;
  user_email: string;
  description: string;
  status: string;
  created_at: string;
}

export default function ReclamosTable() {
  const { token } = useAuth();
  const [reclamos, setReclamos] = useState<Reclamo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState<string>("todos");
  const [detalleId, setDetalleId] = useState<number | null>(null);

  const fetchReclamos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/claims", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar reclamos");
      const data = await res.json();
      setReclamos(data.claims || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReclamos();
    // eslint-disable-next-line
  }, [token]);

  const handleStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/claims/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar el estado");
      setReclamos((prev) => prev.map(r => r.id === id ? { ...r, status } : r));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Filtrar reclamos por estado
  const reclamosFiltrados = filtro === "todos"
    ? reclamos
    : reclamos.filter(r => r.status === filtro);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label>Filtrar por estado: </label>
        <select value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="resuelto">Resuelto</option>
        </select>
      </div>
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Negocio</th>
            <th>Email Usuario</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reclamosFiltrados.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.business_name} (ID: {r.business_id})</td>
              <td>{r.user_email}</td>
              <td>{r.description}</td>
              <td>{r.status}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => setDetalleId(r.id)} style={{ marginRight: 8 }}>Ver</button>
                <button onClick={() => handleStatus(r.id, "resuelto")} disabled={r.status === "resuelto"}>
                  Marcar como resuelto
                </button>
                <button onClick={() => handleStatus(r.id, "pendiente")} disabled={r.status === "pendiente"} style={{ marginLeft: 8 }}>
                  Marcar como pendiente
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reclamosFiltrados.length === 0 && !loading && <div>No hay reclamos.</div>}
      {detalleId && (
        <ReclamoDetalleModal reclamoId={detalleId} onClose={() => setDetalleId(null)} />
      )}
    </div>
  );
}
