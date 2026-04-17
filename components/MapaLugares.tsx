import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { LongPressEvent, MapType } from 'react-native-maps';
import * as Location from 'expo-location';

type Props = {
  onLongPress: (latitud: number, longitud: number) => void;
  focusCoords?: { lat: number; lng: number } | null;
  children?: React.ReactNode;
};

export default function MapaLugares({ onLongPress, focusCoords, children }: Props) {
  const mapRef = useRef<MapView>(null);
  const [ubicacion, setUbicacion] = useState<Location.LocationObject | null>(null);
  const [permisoDenegado, setPermisoDenegado] = useState(false);
  const [tipoMapa, setTipoMapa] = useState<MapType>('standard');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermisoDenegado(true);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setUbicacion(loc);
    })();
  }, []);

  // Cuando llegan coordenadas desde la lista, anima el mapa hacia ese punto
  useEffect(() => {
    if (!focusCoords) return;
    mapRef.current?.animateToRegion(
      {
        latitude: focusCoords.lat,
        longitude: focusCoords.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      800
    );
  }, [focusCoords]);

  const handleLongPress = (e: LongPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    onLongPress(latitude, longitude);
  };

  const toggleTipoMapa = () => {
    setTipoMapa((prev) => (prev === 'standard' ? 'satellite' : 'standard'));
  };

  if (permisoDenegado) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoError}>
          Permiso de ubicación denegado.{'\n'}Actívalo en los ajustes del dispositivo.
        </Text>
      </View>
    );
  }

  if (!ubicacion) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
        <Text style={styles.textoCarga}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapa}>
      <MapView
        ref={mapRef}
        style={styles.mapa}
        mapType={tipoMapa}
        initialRegion={{
          latitude: ubicacion.coords.latitude,
          longitude: ubicacion.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onLongPress={handleLongPress}
        showsUserLocation
      >
        {children}
      </MapView>

      <TouchableOpacity style={styles.botonMapa} onPress={toggleTipoMapa}>
        <Text style={styles.botonMapaTexto}>
          {tipoMapa === 'standard' ? '🛰 Satélite' : '🗺 Normal'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mapa: { flex: 1 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  textoError: { textAlign: 'center', fontSize: 16, color: '#c0392b' },
  textoCarga: { marginTop: 12, fontSize: 14, color: '#555' },
  botonMapa: {
    position: 'absolute',
    bottom: 90,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  botonMapaTexto: { fontSize: 13, fontWeight: '600', color: '#1a1a1a' },
});
