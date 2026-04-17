import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Props = {
  visible: boolean;
  latitud: number;
  longitud: number;
  onGuardar: (nombre: string) => void;
  onCancelar: () => void;
};

export default function ModalNuevoLugar({
  visible,
  latitud,
  longitud,
  onGuardar,
  onCancelar
}: Props) {
  const [nombre, setNombre] = useState('');

  const handleGuardar = () => {
    if (!nombre.trim()) return;
    onGuardar(nombre.trim());
    setNombre(''); // Limpiar para próxima vez
  };

  const handleCancelar = () => {
    setNombre('');
    onCancelar();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>📍 Nuevo lugar favorito</Text>

          <Text style={styles.coords}>
            {latitud.toFixed(6)}°, {longitud.toFixed(6)}°
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del lugar"
            placeholderTextColor="#999"
            value={nombre}
            onChangeText={setNombre}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleGuardar}
          />

          <View style={styles.botones}>
            <TouchableOpacity
              style={[styles.boton, styles.botonCancelar]}
              onPress={handleCancelar}
            >
              <Text style={styles.textoBotonCancelar}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.boton,
                styles.botonGuardar,
                !nombre.trim() && styles.botonDesactivado
              ]}
              onPress={handleGuardar}
              disabled={!nombre.trim()}
            >
              <Text style={styles.textoBotonGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    gap: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  coords: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  botones: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  boton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonCancelar: {
    backgroundColor: '#f0f0f0'
  },
  botonGuardar: {
    backgroundColor: '#2e86de'
  },
  botonDesactivado: {
    backgroundColor: '#a0c4f0'
  },
  textoBotonCancelar: {
    color: '#555',
    fontWeight: '600'
  },
  textoBotonGuardar: {
    color: 'white',
    fontWeight: '600'
  },
});