import { useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
    insertarLugar(nombre, descripcion, coordSeleccionada.lat, coordSeleccionada.lng, '');
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

      {/* Tarjeta flotante superior */}
      <View style={styles.headerFlotante}>
        <Text style={styles.headerTitulo}>Mis Lugares Favoritos</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>
            {lugares.length} {lugares.length === 1 ? 'lugar' : 'lugares'}
          </Text>
        </View>
      </View>

      {/* Hint en la parte inferior */}
      {!coordSeleccionada && (
        <View style={styles.hintContenedor}>
          <Text style={styles.hintTexto}>Mantén presionado el mapa para agregar un lugar</Text>
        </View>
      )}

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

const TINT = '#e84393';

const styles = StyleSheet.create({
  contenedor: { flex: 1 },
  headerFlotante: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  headerTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  badge: {
    backgroundColor: TINT,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeTexto: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  hintContenedor: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    backgroundColor: '#000000aa',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  hintTexto: {
    color: 'white',
    fontSize: 13,
  },
});
