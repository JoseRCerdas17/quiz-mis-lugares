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
  onGuardar: (nombre: string, descripcion: string) => void;
  onCancelar: () => void;
};

export default function ModalNuevoLugar({ visible, latitud, longitud, onGuardar, onCancelar }: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleGuardar = () => {
    if (!nombre.trim()) return;
    onGuardar(nombre.trim(), descripcion.trim());
    setNombre('');
    setDescripcion('');
  };

  const handleCancelar = () => {
    setNombre('');
    setDescripcion('');
    onCancelar();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.card}>
          {/* Handle de arrastre */}
          <View style={styles.handle} />

          {/* Encabezado */}
          <View style={styles.encabezado}>
            <View style={styles.iconoContenedor}>
              <Text style={styles.icono}>★</Text>
            </View>
            <View>
              <Text style={styles.titulo}>Nuevo lugar favorito</Text>
              <Text style={styles.coords}>
                {latitud.toFixed(5)},  {longitud.toFixed(5)}
              </Text>
            </View>
          </View>

          {/* Campos */}
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Cafetería favorita"
              placeholderTextColor="#bbb"
              value={nombre}
              onChangeText={setNombre}
              autoFocus
              returnKeyType="next"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Descripción <Text style={styles.opcional}>(opcional)</Text></Text>
            <TextInput
              style={[styles.input, styles.inputMultilinea]}
              placeholder="¿Qué tiene de especial este lugar?"
              placeholderTextColor="#bbb"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={3}
              returnKeyType="done"
            />
          </View>

          {/* Botones */}
          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={handleCancelar}>
              <Text style={styles.textoBotonCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botonGuardar, !nombre.trim() && styles.botonDesactivado]}
              onPress={handleGuardar}
              disabled={!nombre.trim()}
            >
              <Text style={styles.textoBotonGuardar}>Guardar lugar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const TINT = '#e84393';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000070',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    gap: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 4,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconoContenedor: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: TINT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: { fontSize: 22, color: 'white' },
  titulo: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  coords: { fontSize: 12, color: '#aaa', marginTop: 2 },
  campo: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#444' },
  opcional: { fontWeight: '400', color: '#aaa' },
  input: {
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#1a1a1a',
    backgroundColor: '#fafafa',
  },
  inputMultilinea: {
    height: 80,
    textAlignVertical: 'top',
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  botonCancelar: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  botonGuardar: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: TINT,
  },
  botonDesactivado: { backgroundColor: '#f0b8d8' },
  textoBotonCancelar: { color: '#666', fontWeight: '600', fontSize: 15 },
  textoBotonGuardar: { color: 'white', fontWeight: '700', fontSize: 15 },
});
