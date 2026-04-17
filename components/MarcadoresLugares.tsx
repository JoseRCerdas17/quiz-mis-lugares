import { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { Lugar } from '@/database/database';

type Props = {
  lugares: Lugar[];
};

function PinPersonalizado() {
  return (
    <View style={styles.pinContenedor}>
      <View style={styles.pinCirculo}>
        <Text style={styles.pinIcono}>★</Text>
      </View>
      <View style={styles.pinPunta} />
    </View>
  );
}

export default function MarcadoresLugares({ lugares }: Props) {
  return (
    <>
      {lugares.map((lugar) => (
        <Marker
          key={lugar.id}
          coordinate={{ latitude: lugar.latitud, longitude: lugar.longitud }}
        >
          <PinPersonalizado />
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

const TINT = '#e84393';

const styles = StyleSheet.create({
  pinContenedor: { alignItems: 'center' },
  pinCirculo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: TINT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  pinIcono: { color: 'white', fontSize: 16 },
  pinPunta: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: TINT,
    marginTop: -1,
  },
  callout: {
    padding: 10,
    minWidth: 140,
    maxWidth: 200,
  },
  nombre: { fontWeight: 'bold', fontSize: 14, color: '#1a1a1a' },
  descripcion: { fontSize: 12, color: '#555', marginTop: 4 },
  coords: { fontSize: 11, color: '#aaa', marginTop: 4 },
});
