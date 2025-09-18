import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DEFAULT_PROFILE = {
  avatar: 'https://i.pravatar.cc/200?img=32',
  name: 'María Pérez',
  email: 'maria.perez@example.com',
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [formValues, setFormValues] = useState(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStartEditing = () => {
    setFormValues(profile);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setFormValues(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(formValues);
    setIsEditing(false);
  };

  const renderReadOnly = () => (
    <View style={styles.section}>
      <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      <Text style={styles.label}>Nombre</Text>
      <Text style={styles.value}>{profile.name}</Text>
      <Text style={styles.label}>Correo electrónico</Text>
      <Text style={styles.value}>{profile.email}</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={handleStartEditing}>
        <Text style={styles.primaryButtonText}>Editar perfil</Text>
      </TouchableOpacity>
    </View>
  );

  const renderForm = () => (
    <View style={styles.section}>
      <Text style={styles.label}>URL del avatar</Text>
      <TextInput
        value={formValues.avatar}
        onChangeText={(text) => handleChange('avatar', text)}
        style={styles.input}
        placeholder="https://..."
        autoCapitalize="none"
      />
      <Image source={{ uri: formValues.avatar || DEFAULT_PROFILE.avatar }} style={styles.avatarPreview} />

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        value={formValues.name}
        onChangeText={(text) => handleChange('name', text)}
        style={styles.input}
        placeholder="Tu nombre"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        value={formValues.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
        placeholder="tu@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleCancelEditing}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      {isEditing ? renderForm() : renderReadOnly()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: '#f4f4f5',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827',
    textAlign: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 24,
  },
  avatarPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: '#e5e7eb',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9fafb',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
