"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ResenaDetalleModal from "./ResenaDetalleModal";

interface Resena {
  id: number;
  business_id: number;
  business_name: string;
  user_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ResenasTable() {
  const { token } = useAuth();
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filtroNegocio, setFiltroNegocio] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [detalleId, setDetalleId] = useState<number | null>(null);

  const fetchResenas = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar reseñas");
      const data = await res.json();
      setResenas(data.reviews || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResenas();
    // eslint-disable-next-line
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar esta reseña?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se pudo eliminar");
      setResenas((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Filtrar reseñas por negocio y usuario
  const resenasFiltradas = resenas.filter(r =>
    (filtroNegocio === "" || r.business_name.toLowerCase().includes(filtroNegocio.toLowerCase()) || String(r.business_id) === filtroNegocio) &&
    (filtroUsuario === "" || r.user_email.toLowerCase().includes(filtroUsuario.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Filtrar por negocio o ID..."
          value={filtroNegocio}
          onChange={e => setFiltroNegocio(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Filtrar por email usuario..."
          value={filtroUsuario}
          onChange={e => setFiltroUsuario(e.target.value)}
        />
      </div>
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Negocio</th>
            <th>Email Usuario</th>
            <th>Calificación</th>
            <th>Comentario</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resenasFiltradas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.business_name} (ID: {r.business_id})</td>
              <td>{r.user_email}</td>
              <td>{r.rating}</td>
              <td>{r.comment}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => setDetalleId(r.id)} style={{ marginRight: 8 }}>Ver</button>
                <button onClick={() => handleDelete(r.id)} style={{ color: 'red' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {resenasFiltradas.length === 0 && !loading && <div>No hay reseñas.</div>}
      {detalleId && (
        <ResenaDetalleModal resenaId={detalleId} onClose={() => setDetalleId(null)} />
      )}
    </div>
  );
}
