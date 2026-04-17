import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import MapaLugares from '@/components/MapaLugares';
import ModalNuevoLugar from '@/components/ModalNuevoLugar';
import MarcadoresLugares from '@/components/MarcadoresLugares';
import { insertarLugar, obtenerLugares, Lugar } from '@/database/database';

export default function PantallaInicio() {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [coordSeleccionada, setCoordSeleccionada] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Carga los lugares cada vez que la pantalla recibe foco (persistencia real)
  useFocusEffect(
    useCallback(() => {
      setLugares(obtenerLugares());
    }, [])
  );

  const handleLongPress = (latitud: number, longitud: number) => {
    setCoordSeleccionada({ lat: latitud, lng: longitud });
  };

  const handleGuardar = (nombre: string, descripcion: string) => {
    if (!coordSeleccionada) return;
    insertarLugar(
      nombre,
      descripcion,
      coordSeleccionada.lat,
      coordSeleccionada.lng,
      ''
    );
    // Refresca el estado → MarcadoresLugares se re-renderiza automáticamente
    setLugares(obtenerLugares());
    setCoordSeleccionada(null);
  };

  const handleCancelar = () => {
    setCoordSeleccionada(null);
  };

  return (
    <View style={styles.contenedor}>
      <MapaLugares onLongPress={handleLongPress}>
        <MarcadoresLugares lugares={lugares} />
      </MapaLugares>

      {coordSeleccionada && (
        <ModalNuevoLugar
          visible
          latitud={coordSeleccionada.lat}
          longitud={coordSeleccionada.lng}
          onGuardar={handleGuardar}
          onCancelar={handleCancelar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1 },
});
