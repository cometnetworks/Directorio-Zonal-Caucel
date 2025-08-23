"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface UsuarioDetalleModalProps {
  usuarioId: number | null;
  onClose: () => void;
}

export default function UsuarioDetalleModal({ usuarioId, onClose }: UsuarioDetalleModalProps) {
  const { token } = useAuth();
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!usuarioId) return;
    setLoading(true);
    setError("");
    fetch(`http://localhost:3001/api/users/${usuarioId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUsuario(data.user))
      .catch(() => setError("Error al cargar detalles"))
      .finally(() => setLoading(false));
  }, [usuarioId, token]);

  if (!usuarioId) return null;
  if (loading) return <div style={modalStyle}>Cargando...</div>;
  if (error) return <div style={modalStyle}>{error}</div>;
  if (!usuario) return null;

  return (
    <div style={modalStyle}>
      <button onClick={onClose} style={{ float: 'right' }}>Cerrar</button>
      <h2>Detalle del Usuario</h2>
      <div><b>ID:</b> {usuario.id}</div>
      <div><b>Email:</b> {usuario.email}</div>
      <div><b>Nombre:</b> {usuario.name}</div>
      <div><b>Rol:</b> {usuario.role}</div>
      <div><b>Fecha de registro:</b> {new Date(usuario.created_at).toLocaleString()}</div>
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
