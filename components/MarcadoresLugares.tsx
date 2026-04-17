import { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { Lugar } from '@/database/database';

type Props = {
  lugares: Lugar[];
};

export default function MarcadoresLugares({ lugares }: Props) {
  return (
    <>
      {lugares.map((lugar) => (
        <Marker
          key={lugar.id}
          coordinate={{
            latitude: lugar.latitud,
            longitude: lugar.longitud
          }}
          pinColor="#FF6B6B"  // Color rojo para los marcadores
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.nombre}>{lugar.nombre}</Text>
              <Text style={styles.coords}>
                📍 {lugar.latitud.toFixed(4)}, {lugar.longitud.toFixed(4)}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  callout: { padding: 8, maxWidth: 200 },
  nombre: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  coords: { fontSize: 11, color: '#666' },
});