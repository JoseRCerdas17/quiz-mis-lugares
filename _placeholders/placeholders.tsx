/**
 * PLACEHOLDERS — app/(tabs)/index.tsx
 *
 * Usar estos archivos mientras los otros integrantes terminan su trabajo.
 * Cuando entreguen sus versiones reales, simplemente borrar estos archivos;
 * los imports en index.tsx no necesitan cambiar.
 *
 * Estructura esperada de cada integrante:
 *   Integrante 1 → components/MapaLugares.tsx
 *   Integrante 2 → database/database.ts
 *   Integrante 3 → components/MarcadoresLugares.tsx
 *                  components/ModalNuevoLugar.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

// ─────────────────────────────────────────────
// database/database.ts  (Integrante 2)
// ─────────────────────────────────────────────
export interface Lugar {
  id: number;
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  imagen: string;
}

let _lugares: Lugar[] = [];
let _nextId = 1;

export function obtenerLugares(): Lugar[] {
  return [..._lugares];
}

export function insertarLugar(
  nombre: string,
  descripcion: string,
  latitud: number,
  longitud: number,
  imagen: string
): void {
  _lugares.push({ id: _nextId++, nombre, descripcion, latitud, longitud, imagen });
}

// ─────────────────────────────────────────────
// components/MapaLugares.tsx  (Integrante 1)
// ─────────────────────────────────────────────
interface MapaLugaresProps {
  onLongPress: (latitud: number, longitud: number) => void;
  children?: React.ReactNode;
}

export function MapaLugares({ onLongPress, children }: MapaLugaresProps) {
  return (
    <View style={placeholderStyles.mapa}>
      <Text style={placeholderStyles.label}>🗺  MapaLugares (placeholder)</Text>
      <TouchableOpacity
        style={placeholderStyles.btn}
        onPress={() => onLongPress(9.9281, -84.0907)}
      >
        <Text style={placeholderStyles.btnText}>Simular long press</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
}

// ─────────────────────────────────────────────
// components/MarcadoresLugares.tsx  (Integrante 3)
// ─────────────────────────────────────────────
interface MarcadoresProps {
  lugares: Lugar[];
}

export function MarcadoresLugares({ lugares }: MarcadoresProps) {
  return (
    <View style={placeholderStyles.marcadores}>
      {lugares.map((l) => (
        <Text key={l.id} style={placeholderStyles.marcador}>
          📍 {l.nombre} ({l.latitud.toFixed(4)}, {l.longitud.toFixed(4)})
        </Text>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────
// components/ModalNuevoLugar.tsx  (Integrante 3)
// ─────────────────────────────────────────────
interface ModalProps {
  visible: boolean;
  latitud: number;
  longitud: number;
  onGuardar: (nombre: string, descripcion: string) => void;
  onCancelar: () => void;
}

export function ModalNuevoLugar({
  visible,
  latitud,
  longitud,
  onGuardar,
  onCancelar,
}: ModalProps) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleGuardar = () => {
    if (!nombre.trim()) return;
    onGuardar(nombre.trim(), descripcion.trim());
    setNombre('');
    setDescripcion('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={placeholderStyles.modalOverlay}>
        <View style={placeholderStyles.modalBox}>
          <Text style={placeholderStyles.label}>
            Nuevo lugar ({latitud.toFixed(4)}, {longitud.toFixed(4)})
          </Text>
          <TextInput
            style={placeholderStyles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={placeholderStyles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={placeholderStyles.btn} onPress={handleGuardar}>
              <Text style={placeholderStyles.btnText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[placeholderStyles.btn, { backgroundColor: '#ccc' }]}
              onPress={onCancelar}
            >
              <Text style={[placeholderStyles.btnText, { color: '#333' }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─────────────────────────────────────────────
// Estilos internos de los placeholders
// ─────────────────────────────────────────────
const placeholderStyles = StyleSheet.create({
  mapa: {
    flex: 1,
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
  },
  marcadores: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    gap: 4,
  },
  marcador: {
    fontSize: 12,
    color: '#333',
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#4f6ef7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
});
