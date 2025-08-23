"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface ResenaDetalleModalProps {
  resenaId: number | null;
  onClose: () => void;
}

export default function ResenaDetalleModal({ resenaId, onClose }: ResenaDetalleModalProps) {
  const { token } = useAuth();
  const [resena, setResena] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resenaId) return;
    setLoading(true);
    setError("");
    fetch(`http://localhost:3001/api/reviews/${resenaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setResena(data.review))
      .catch(() => setError("Error al cargar detalles"))
      .finally(() => setLoading(false));
  }, [resenaId, token]);

  if (!resenaId) return null;
  if (loading) return <div style={modalStyle}>Cargando...</div>;
  if (error) return <div style={modalStyle}>{error}</div>;
  if (!resena) return null;

  return (
    <div style={modalStyle}>
      <button onClick={onClose} style={{ float: 'right' }}>Cerrar</button>
      <h2>Detalle de la Reseña</h2>
      <div><b>ID:</b> {resena.id}</div>
      <div><b>Negocio:</b> {resena.business_name} (ID: {resena.business_id})</div>
      <div><b>Email Usuario:</b> {resena.user_email}</div>
      <div><b>Calificación:</b> {resena.rating}</div>
      <div><b>Comentario:</b> {resena.comment}</div>
      <div><b>Fecha:</b> {new Date(resena.created_at).toLocaleString()}</div>
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
