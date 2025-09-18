"use client";

import { useMemo, useState } from "react";

const AVATARS = [
  "https://i.pravatar.cc/240?img=3",
  "https://i.pravatar.cc/240?img=7",
  "https://i.pravatar.cc/240?img=12",
  "https://i.pravatar.cc/240?img=18",
  "https://i.pravatar.cc/240?img=24",
  "https://i.pravatar.cc/240?img=28",
];

const dummyUser = {
  name: "Ana Martínez",
  email: "ana.martinez@example.com",
  memberSince: "Miembro desde abril 2023",
  location: "Mérida, Yucatán",
};

const dummyStats = [
  { label: "Favoritos guardados", value: 18 },
  { label: "Negocios visitados", value: 42 },
  { label: "Reseñas hechas", value: 12 },
];

const recentSearches = [
  { term: "Cafeterías con wifi", date: "12 de enero, 09:24", results: 8 },
  { term: "Veterinarias 24h", date: "7 de enero, 19:03", results: 5 },
  { term: "Gimnasios cerca de mí", date: "2 de enero, 06:45", results: 12 },
  { term: "Taquerías económicas", date: "28 de diciembre, 21:17", results: 6 },
];

function getRandomAvatar(current) {
  if (AVATARS.length === 0) return current;
  let next = current;
  if (AVATARS.length === 1) return AVATARS[0];
  while (next === current) {
    next = AVATARS[Math.floor(Math.random() * AVATARS.length)];
  }
  return next;
}

export default function ProfileScreen() {
  const [avatarUrl, setAvatarUrl] = useState(() => AVATARS[0]);

  const stats = useMemo(() => dummyStats, []);
  const searches = useMemo(() => recentSearches, []);

  const handleChangeAvatar = () => {
    setAvatarUrl((current) => getRandomAvatar(current));
  };

  return (
    <div style={styles.wrapper}>
      <section style={styles.profileCard}>
        <div style={styles.avatarWrapper}>
          <img
            src={avatarUrl}
            alt="Avatar del usuario"
            style={styles.avatar}
            width={160}
            height={160}
          />
          <button type="button" style={styles.avatarButton} onClick={handleChangeAvatar}>
            Cambiar foto de perfil
          </button>
        </div>
        <div>
          <h1 style={styles.userName}>{dummyUser.name}</h1>
          <p style={styles.userMeta}>{dummyUser.email}</p>
          <p style={styles.userMeta}>{dummyUser.memberSince}</p>
          <p style={styles.userMeta}>{dummyUser.location}</p>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Tu actividad</h2>
        <div style={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} style={styles.statCard}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Búsquedas recientes</h2>
        <ul style={styles.searchList}>
          {searches.map((search) => (
            <li key={search.term + search.date} style={styles.searchItem}>
              <span style={styles.searchTerm}>{search.term}</span>
              <span style={styles.searchMeta}>
                {search.date} · {search.results} resultados
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "24px",
    backgroundColor: "#f5f6fb",
    color: "#1c2434",
    minHeight: "100vh",
  },
  profileCard: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    alignItems: "center",
    padding: "24px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
    flexWrap: "wrap",
  },
  avatarWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #4c6ef5",
    boxShadow: "0 8px 16px rgba(15, 23, 42, 0.15)",
  },
  avatarButton: {
    padding: "10px 18px",
    borderRadius: "999px",
    backgroundColor: "#4c6ef5",
    color: "#ffffff",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(76, 110, 245, 0.35)",
  },
  userName: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 700,
  },
  userMeta: {
    margin: "4px 0",
    color: "#475569",
    fontSize: "1rem",
  },
  section: {
    padding: "24px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
  },
  sectionTitle: {
    margin: "0 0 16px 0",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#1c2434",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  statCard: {
    backgroundColor: "#f8f9ff",
    borderRadius: "12px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    border: "1px solid rgba(76, 110, 245, 0.15)",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#4c6ef5",
  },
  statLabel: {
    fontSize: "0.95rem",
    color: "#475569",
    textAlign: "center",
  },
  searchList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  searchItem: {
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  searchTerm: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#1c2434",
  },
  searchMeta: {
    fontSize: "0.95rem",
    color: "#64748b",
  },
};
