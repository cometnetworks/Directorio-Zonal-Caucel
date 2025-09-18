import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const STATS = [
  { label: 'Favoritos', value: 24 },
  { label: 'Visitados', value: 12 },
  { label: 'Reseñas', value: 8 },
];

const RECENT_SEARCHES = [
  'Cafeterías en Caucel',
  'Talleres mecánicos cercanos',
  'Papelerías con servicio a domicilio',
  'Heladerías familiares',
  'Restaurantes con terraza',
];

const getRandomAvatarId = (currentId) => {
  let newId = currentId;

  while (newId === currentId) {
    newId = Math.floor(Math.random() * 70) + 1;
  }

  return newId;
};

const ProfileScreen = () => {
  const [name, setName] = useState('María Pérez');
  const [email, setEmail] = useState('maria.perez@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] = useState(email);
  const [avatarId, setAvatarId] = useState(32);

  const avatarUrl = useMemo(() => `https://i.pravatar.cc/150?img=${avatarId}`, [avatarId]);

  const handleToggleEdit = () => {
    if (isEditing) {
      setName(formName.trim() || name);
      setEmail(formEmail.trim() || email);
      setIsEditing(false);
      Alert.alert('Perfil actualizado', 'Tus datos han sido guardados correctamente.');
      return;
    }

    setFormName(name);
    setFormEmail(email);
    setIsEditing(true);
  };

  const handleChangeAvatar = () => {
    setAvatarId((current) => getRandomAvatarId(current));
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', 'Se ha simulado el cierre de sesión.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangeAvatar}>
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre</Text>
            {isEditing ? (
              <TextInput
                value={formName}
                onChangeText={setFormName}
                style={styles.input}
                placeholder="Tu nombre"
              />
            ) : (
              <Text style={styles.infoValue}>{name}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo electrónico</Text>
            {isEditing ? (
              <TextInput
                value={formEmail}
                onChangeText={setFormEmail}
                style={styles.input}
                placeholder="correo@ejemplo.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{email}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, isEditing && styles.saveButton]}
            onPress={handleToggleEdit}
          >
            <Text style={styles.primaryButtonText}>
              {isEditing ? 'Guardar cambios' : 'Editar perfil'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tu actividad</Text>
        <View style={styles.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Búsquedas recientes</Text>
        {RECENT_SEARCHES.map((item) => (
          <View key={item} style={styles.searchItem}>
            <View style={styles.searchBullet} />
            <Text style={styles.searchText}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    gap: 24,
    shadowColor: '#1f2933',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 24,
  },
  avatarWrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  changePhotoText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  infoRow: {
    gap: 6,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#059669',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1f2933',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginTop: 6,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
    marginRight: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;
