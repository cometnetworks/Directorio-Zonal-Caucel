"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const menu = [
  { href: "/(admin)/dashboard", label: "Dashboard" },
  { href: "/(admin)/negocios", label: "Negocios" },
  { href: "/(admin)/reclamos", label: "Reclamos" },
  { href: "/(admin)/metricas", label: "Métricas" },
  { href: "/", label: "Ver Plataforma" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--neutral)" }}>
      <nav style={{
        width: 220,
        backgroundColor: "var(--primary)",
        color: "var(--text-light)",
        padding: 24,
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
          gap: "12px"
        }}>
          <img
            src="/logo.png"
            alt="Directorio Zonal Caucel Logo"
            style={{
              height: "40px",
              width: "auto"
            }}
          />
          <h2 style={{
            color: "var(--accent)",
            fontSize: "1.2rem",
            fontWeight: "bold",
            margin: 0
          }}>
            Directorio Zonal Caucel
          </h2>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  marginBottom: "8px",
                  color: pathname === item.href ? "var(--accent)" : "var(--text-light)",
                  backgroundColor: pathname === item.href ? "var(--secondary)" : "transparent",
                  fontWeight: pathname === item.href ? "bold" : "normal",
                  textDecoration: "none",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={logout}
          style={{
            marginTop: 32,
            width: "100%",
            backgroundColor: "var(--accent)",
            color: "var(--primary)",
            border: 0,
            padding: "12px 16px",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--secondary)"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--accent)"}
        >
          Cerrar sesión
        </button>
      </nav>
      <main style={{
        flex: 1,
        padding: 32,
        backgroundColor: "var(--neutral)",
        color: "var(--text-dark)"
      }}>
        {children}
      </main>
    </div>
  );
}
