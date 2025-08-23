"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import NegocioDetalleModal from "./NegocioDetalleModal";

interface Business {
  id: number;
  name: string;
  address: string;
  category: string;
  phone: string;
  status: string;
}

export default function NegociosTable() {
  const { token } = useAuth();
  const [negocios, setNegocios] = useState<Business[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detalleId, setDetalleId] = useState<number | null>(null);

  const fetchNegocios = async (q = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3001/api/businesses?search=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar negocios");
      const data = await res.json();
      setNegocios(data.businesses || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegocios();
    // eslint-disable-next-line
  }, [token]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNegocios(search);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este negocio?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/businesses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se pudo eliminar");
      setNegocios((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Buscar negocio..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button type="submit">Buscar</button>
      </form>
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Categoría</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {negocios.map((n) => (
            <tr key={n.id}>
              <td>{n.id}</td>
              <td>{n.name}</td>
              <td>{n.address}</td>
              <td>{n.category}</td>
              <td>{n.phone}</td>
              <td>{n.status}</td>
              <td>
                <button onClick={() => setDetalleId(n.id)} style={{ marginRight: 8 }}>Ver</button>
                <button onClick={() => handleDelete(n.id)} style={{ color: 'red' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {negocios.length === 0 && !loading && <div>No hay negocios.</div>}
      {detalleId && (
        <NegocioDetalleModal negocioId={detalleId} onClose={() => setDetalleId(null)} />
      )}
    </div>
  );
}
