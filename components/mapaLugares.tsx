import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { LongPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';

type Props = {
  onLongPress: (latitud: number, longitud: number) => void;
  children?: React.ReactNode;
};

export default function MapaLugares({ onLongPress, children }: Props) {
  const [ubicacion, setUbicacion] = useState<Location.LocationObject | null>(null);
  const [permisoDenegado, setPermisoDenegado] = useState(false);

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

  if (permisoDenegado) {
    return (
      <View style={styles.fallback}>
        <Text>Permiso de ubicación denegado. Actívalo en ajustes.</Text>
      </View>
    );
  }

  if (!ubicacion) {
    return (
      <View style={styles.fallback}>
        <Text>Obteniendo ubicación...</Text>
      </View>
    );
  }

  const handleLongPress = (e: LongPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    onLongPress(latitude, longitude);
  };

  return (
    <MapView
      style={styles.mapa}
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
  );
}

const styles = StyleSheet.create({
  mapa: { flex: 1 },
  fallback: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});