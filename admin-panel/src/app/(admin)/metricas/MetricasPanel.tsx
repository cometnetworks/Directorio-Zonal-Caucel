"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface Metricas {
  total_negocios: number;
  total_reclamos: number;
  reclamos_pendientes: number;
  reclamos_resueltos: number;
  negocios_por_categoria: { [categoria: string]: number };
}

export default function MetricasPanel() {
  const { token } = useAuth();
  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("http://localhost:3001/api/admin/metricas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMetricas(data))
      .catch(() => setError("Error al cargar métricas"))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h2>Métricas Generales</h2>
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {metricas && (
        <div>
          <div><b>Total de negocios:</b> {metricas.total_negocios}</div>
          <div><b>Total de reclamos:</b> {metricas.total_reclamos}</div>
          <div><b>Reclamos pendientes:</b> {metricas.reclamos_pendientes}</div>
          <div><b>Reclamos resueltos:</b> {metricas.reclamos_resueltos}</div>
          <div style={{ marginTop: 16 }}>
            <b>Negocios por categoría:</b>
            <ul>
              {Object.entries(metricas.negocios_por_categoria).map(([cat, count]) => (
                <li key={cat}>{cat}: {count}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
