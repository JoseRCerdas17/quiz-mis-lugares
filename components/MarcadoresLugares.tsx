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
          coordinate={{ latitude: lugar.latitud, longitude: lugar.longitud }}
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.nombre}>{lugar.nombre}</Text>
              {!!lugar.descripcion?.trim() && (
                <Text style={styles.descripcion}>{lugar.descripcion}</Text>
              )}
              <Text style={styles.coords}>
                {lugar.latitud.toFixed(4)}, {lugar.longitud.toFixed(4)}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  callout: { padding: 6, maxWidth: 180 },
  nombre: { fontWeight: 'bold', fontSize: 14 },
  descripcion: { fontSize: 12, color: '#444', marginTop: 4 },
  coords: { fontSize: 11, color: '#888', marginTop: 2 },
});
