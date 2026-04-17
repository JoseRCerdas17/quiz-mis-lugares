import { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { obtenerLugares, Lugar } from '@/database/database';

export default function PantallaLugares() {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setLugares(obtenerLugares());
    }, [])
  );

  const irAlMapa = (lugar: Lugar) => {
    router.push({
      pathname: '/(tabs)',
      params: { lat: lugar.latitud, lng: lugar.longitud },
    });
  };

  const renderItem = ({ item, index }: { item: Lugar; index: number }) => (
    <TouchableOpacity style={styles.tarjeta} onPress={() => irAlMapa(item)} activeOpacity={0.7}>
      <View style={styles.tarjetaIzquierda}>
        <View style={styles.numeroBadge}>
          <Text style={styles.numero}>{index + 1}</Text>
        </View>
      </View>
      <View style={styles.tarjetaContenido}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        {!!item.descripcion?.trim() && (
          <Text style={styles.descripcion} numberOfLines={2}>{item.descripcion}</Text>
        )}
        <Text style={styles.coords}>
          {item.latitud.toFixed(5)},  {item.longitud.toFixed(5)}
        </Text>
      </View>
      <View style={styles.tarjetaDerecha}>
        <Text style={styles.flecha}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.contenedor}>
      {lugares.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioBig}>★</Text>
          <Text style={styles.vacioTitulo}>Sin lugares guardados</Text>
          <Text style={styles.vacioSub}>
            Ve al mapa y mantén presionado{'\n'}para agregar tu primer lugar.
          </Text>
        </View>
      ) : (
        <FlatList
          data={lugares}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
        />
      )}
    </View>
  );
}

const TINT = '#e84393';

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f7f7f7' },
  lista: { padding: 16, paddingBottom: 32 },
  tarjeta: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tarjetaIzquierda: { marginRight: 14 },
  numeroBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: TINT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numero: { color: 'white', fontWeight: '700', fontSize: 15 },
  tarjetaContenido: { flex: 1 },
  nombre: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  descripcion: { fontSize: 13, color: '#666', marginTop: 3 },
  coords: { fontSize: 11, color: '#bbb', marginTop: 5 },
  tarjetaDerecha: { marginLeft: 8 },
  flecha: { fontSize: 26, color: '#ccc', fontWeight: '300' },
  separador: { height: 10 },
  vacio: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, gap: 12 },
  vacioBig: { fontSize: 64, color: TINT },
  vacioTitulo: { fontSize: 20, fontWeight: '700', color: '#1a1a1a' },
  vacioSub: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 22 },
});
