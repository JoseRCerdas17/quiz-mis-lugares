import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import MapaLugares from '@/components/MapaLugares';
import ModalNuevoLugar from '@/components/ModalNuevoLugar';
import MarcadoresLugares from '@/components/MarcadoresLugares';
import { insertarLugar, obtenerLugares, Lugar } from '@/database/database';

export default function PantallaInicio() {
  // Estado para los lugares guardados en SQLite
  const [lugares, setLugares] = useState<Lugar[]>([]);

  // Estado para la coordenada seleccionada con long press
  const [coordSeleccionada, setCoordSeleccionada] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Carga los lugares desde SQLite cada vez que la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      const lugaresDB = obtenerLugares();
      setLugares(lugaresDB);
      console.log(`📚 Cargados ${lugaresDB.length} lugares desde SQLite`);
    }, [])
  );

  // Recibe las coordenadas del long press desde MapaLugares
  const handleLongPress = (latitud: number, longitud: number) => {
    console.log(`📍 Long press en: ${latitud}, ${longitud}`);
    setCoordSeleccionada({ lat: latitud, lng: longitud });
  };

  // Guarda el nuevo lugar en SQLite y actualiza los marcadores
  const handleGuardar = (nombre: string) => {
    if (!coordSeleccionada) return;

    // Insertar en SQLite
    insertarLugar(
      nombre,
      '', // descripción vacía por ahora
      coordSeleccionada.lat,
      coordSeleccionada.lng,
      '' // imagen_uri vacía
    );

    // Recargar lugares y actualizar marcadores automáticamente
    const lugaresActualizados = obtenerLugares();
    setLugares(lugaresActualizados);

    console.log(`✅ Lugar "${nombre}" guardado. Total: ${lugaresActualizados.length}`);

    // Cerrar modal
    setCoordSeleccionada(null);
  };

  const handleCancelar = () => {
    setCoordSeleccionada(null);
  };

  return (
    <View style={styles.contenedor}>
      {/* Mapa que captura long press */}
      <MapaLugares onLongPress={handleLongPress}>
        {/* Marcadores que se actualizan automáticamente */}
        <MarcadoresLugares lugares={lugares} />
      </MapaLugares>

      {/* Modal que aparece al hacer long press */}
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
