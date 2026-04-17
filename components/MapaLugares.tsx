import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
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

  const handleLongPress = (e: LongPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    onLongPress(latitude, longitude);
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
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  textoError: { textAlign: 'center', fontSize: 16, color: '#c0392b' },
  textoCarga: { marginTop: 12, fontSize: 14, color: '#555' },
});
