import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MapaLugares from '@/components/mapaLugares';
import {
  MarcadoresLugares,
  ModalNuevoLugar,
  insertarLugar,
  obtenerLugares,
  type Lugar,
} from '@/_placeholders/placeholders';

export default function HomeScreen() {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [coordSeleccionada, setCoordSeleccionada] = useState<{
    latitud: number;
    longitud: number;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      setLugares(obtenerLugares());
    }, [])
  );

  const handleLongPress = (latitud: number, longitud: number) => {
    setCoordSeleccionada({ latitud, longitud });
  };

  const handleGuardar = (nombre: string, descripcion: string) => {
    if (!coordSeleccionada) return;
    insertarLugar(
      nombre,
      descripcion,
      coordSeleccionada.latitud,
      coordSeleccionada.longitud,
      ''
    );
    setLugares(obtenerLugares());
    setCoordSeleccionada(null);
  };

  return (
    <View style={styles.container}>
      <MapaLugares onLongPress={handleLongPress} />
      <MarcadoresLugares lugares={lugares} />
      <ModalNuevoLugar
        visible={coordSeleccionada !== null}
        latitud={coordSeleccionada?.latitud ?? 0}
        longitud={coordSeleccionada?.longitud ?? 0}
        onGuardar={handleGuardar}
        onCancelar={() => setCoordSeleccionada(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
