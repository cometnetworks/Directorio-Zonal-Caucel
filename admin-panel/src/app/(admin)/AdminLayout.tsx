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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav style={{ width: 220, background: "#f5f5f5", padding: 24 }}>
        <h2>Admin</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                style={{
                  display: "block",
                  padding: "8px 0",
                  color: pathname === item.href ? "#0070f3" : "#222",
                  fontWeight: pathname === item.href ? "bold" : "normal",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={logout}
          style={{ marginTop: 32, width: "100%", background: "#e00", color: "#fff", border: 0, padding: 8, borderRadius: 4 }}
        >
          Cerrar sesión
        </button>
      </nav>
      <main style={{ flex: 1, padding: 32 }}>{children}</main>
    </div>
  );
}
