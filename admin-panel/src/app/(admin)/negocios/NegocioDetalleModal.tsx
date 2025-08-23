"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface NegocioDetalleModalProps {
  negocioId: number | null;
  onClose: () => void;
}

export default function NegocioDetalleModal({ negocioId, onClose }: NegocioDetalleModalProps) {
  const { token } = useAuth();
  const [negocio, setNegocio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!negocioId) return;
    setLoading(true);
    setError("");
    fetch(`http://localhost:3001/api/businesses/${negocioId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setNegocio(data.business))
      .catch(() => setError("Error al cargar detalles"))
      .finally(() => setLoading(false));
  }, [negocioId, token]);

  if (!negocioId) return null;
  if (loading) return <div style={modalStyle}>Cargando...</div>;
  if (error) return <div style={modalStyle}>{error}</div>;
  if (!negocio) return null;

  // Estado local para edición
  const [editData, setEditData] = useState({
    name: negocio.name || "",
    address: negocio.address || "",
    category: negocio.category || "",
    phone: negocio.phone || "",
    status: negocio.status || "",
    description: negocio.description || "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);

  // Gestión de imágenes
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgError, setImgError] = useState("");

  // Cargar imágenes al abrir modal
  useEffect(() => {
    if (!negocioId) return;
    setImgLoading(true);
    setImgError("");
    fetch(`http://localhost:3001/api/businesses/${negocioId}/images`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setImagenes(data.images || []))
      .catch(() => setImgError("Error al cargar imágenes"))
      .finally(() => setImgLoading(false));
  }, [negocioId, token, success]);

  // Subir imagen
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setImgLoading(true);
    setImgError("");
    try {
      const res = await fetch(`http://localhost:3001/api/businesses/${negocioId}/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      } as any); // TS workaround for FormData
      if (!res.ok) throw new Error("No se pudo subir la imagen");
      const data = await res.json();
      setImagenes(data.images || []);
    } catch (err: any) {
      setImgError(err.message);
    } finally {
      setImgLoading(false);
    }
  };

  // Eliminar imagen
  const handleDeleteImg = async (imgUrl: string) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    setImgLoading(true);
    setImgError("");
    try {
      const res = await fetch(`http://localhost:3001/api/businesses/${negocioId}/images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: imgUrl }),
      });
      if (!res.ok) throw new Error("No se pudo eliminar la imagen");
      setImagenes(imagenes.filter(img => img !== imgUrl));
    } catch (err: any) {
      setImgError(err.message);
    } finally {
      setImgLoading(false);
    }
  };

  // Sincronizar editData cuando cambia negocio
  useEffect(() => {
    setEditData({
      name: negocio.name || "",
      address: negocio.address || "",
      category: negocio.category || "",
      phone: negocio.phone || "",
      status: negocio.status || "",
      description: negocio.description || "",
    });
    setSuccess(false);
    setSaveError("");
  }, [negocio]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSuccess(false);
    try {
      const res = await fetch(`http://localhost:3001/api/businesses/${negocioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("No se pudo actualizar");
      setSuccess(true);
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={modalStyle}>
      <button onClick={onClose} style={{ float: 'right' }}>Cerrar</button>
      <h2>Detalle y Edición del Negocio</h2>
      <form onSubmit={handleSave}>
        <div><b>ID:</b> {negocio.id}</div>
        <div>
          <b>Nombre:</b><br />
          <input name="name" value={editData.name} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div>
          <b>Dirección:</b><br />
          <input name="address" value={editData.address} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div>
          <b>Categoría:</b><br />
          <input name="category" value={editData.category} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div>
          <b>Teléfono:</b><br />
          <input name="phone" value={editData.phone} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <div>
          <b>Estado:</b><br />
          <input name="status" value={editData.status} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <div>
          <b>Descripción:</b><br />
          <textarea name="description" value={editData.description} onChange={handleChange} style={{ width: '100%' }} />
        </div>
        <button type="submit" disabled={saving} style={{ marginTop: 12 }}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        {saveError && <div style={{ color: 'red', marginTop: 8 }}>{saveError}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>¡Actualizado!</div>}
      </form>

      <div style={{ marginTop: 32 }}>
        <h3>Imágenes del Negocio</h3>
        {imgLoading && <div>Cargando imágenes...</div>}
        {imgError && <div style={{ color: 'red' }}>{imgError}</div>}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          {imagenes.map((img) => (
            <div key={img} style={{ position: 'relative' }}>
              <img src={img} alt="Imagen negocio" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6, border: '1px solid #ccc' }} />
              <button onClick={() => handleDeleteImg(img)} style={{ position: 'absolute', top: 2, right: 2, background: '#e00', color: '#fff', border: 0, borderRadius: '50%', width: 22, height: 22, cursor: 'pointer' }}>×</button>
            </div>
          ))}
        </div>
        <input type="file" accept="image/*" onChange={handleUpload} />
      </div>
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
