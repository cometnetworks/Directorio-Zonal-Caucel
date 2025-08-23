"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface ReclamoDetalleModalProps {
  reclamoId: number | null;
  onClose: () => void;
}

export default function ReclamoDetalleModal({ reclamoId, onClose }: ReclamoDetalleModalProps) {
  const { token } = useAuth();
  const [reclamo, setReclamo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reclamoId) return;
    setLoading(true);
    setError("");
    fetch(`http://localhost:3001/api/claims/${reclamoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setReclamo(data.claim))
      .catch(() => setError("Error al cargar detalles"))
      .finally(() => setLoading(false));
  }, [reclamoId, token]);

  if (!reclamoId) return null;
  if (loading) return <div style={modalStyle}>Cargando...</div>;
  if (error) return <div style={modalStyle}>{error}</div>;
  if (!reclamo) return null;

  return (
    <div style={modalStyle}>
      <button onClick={onClose} style={{ float: 'right' }}>Cerrar</button>
      <h2>Detalle del Reclamo</h2>
      <div><b>ID:</b> {reclamo.id}</div>
      <div><b>Negocio:</b> {reclamo.business_name} (ID: {reclamo.business_id})</div>
      <div><b>Email Usuario:</b> {reclamo.user_email}</div>
      <div><b>Descripción:</b> {reclamo.description}</div>
      <div><b>Estado:</b> {reclamo.status}</div>
      <div><b>Fecha:</b> {new Date(reclamo.created_at).toLocaleString()}</div>
      {/* Puedes agregar más detalles aquí */}
    </div>
  );
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  background: '#fff',
  padding: 32,
  borderRadius: 8,
  boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
  zIndex: 1000,
  minWidth: 350,
};
