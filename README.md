# 📍 MisLugares — App React Native con Expo

App móvil para guardar lugares favoritos en un mapa, con persistencia SQLite.

---

## Integrantes y responsabilidades

| # | Archivo(s) | Rol |
|---|-----------|-----|
| 1 | `components/MapaLugares.tsx` | Mapa base, manejo de `onLongPress` |
| 2 | `database/database.ts` | SQLite: tipos, `insertarLugar`, `obtenerLugares` |
| 3 | `components/MarcadoresLugares.tsx`, `components/ModalNuevoLugar.tsx` | Marcadores con Callout, Modal de formulario |
| **4** | **`app/(tabs)/index.tsx`** | **Integración, estado global, persistencia con `useFocusEffect`** |

### Dependencias entre integrantes

```
Integrante 1 ──► Integrante 4 (MapaLugares)
Integrante 2 ──► Integrante 3 (tipos Lugar)
             ──► Integrante 4 (insertarLugar, obtenerLugares)
Integrante 3 ──► Integrante 4 (MarcadoresLugares, ModalNuevoLugar)
```

---

## Instalación

```bash
git clone <url-del-repo>
cd places-native-app
npm install
npx expo start
```

Escanear el QR con **Expo Go** (iOS/Android) o correr en emulador.

---

## Cómo funciona la integración (Integrante 4)

### Persistencia con `useFocusEffect`

```ts
useFocusEffect(
  useCallback(() => {
    setLugares(obtenerLugares()); // lee SQLite cada vez que la pantalla recibe foco
  }, [])
);
```

Esto garantiza que aunque el usuario navegue a otras pantallas y vuelva, los datos siempre están actualizados desde SQLite.

### Flujo completo de datos

```
Long press en mapa
    → handleLongPress(lat, lng)
    → setCoordSeleccionada({ lat, lng })
    → aparece <ModalNuevoLugar>

Usuario escribe y guarda
    → handleGuardar(nombre, descripcion)
    → insertarLugar(...) [escribe en SQLite]
    → setLugares(obtenerLugares()) [re-lee SQLite]
    → setCoordSeleccionada(null) [cierra modal]
    → React re-renderiza <MarcadoresLugares lugares={lugares}>
    → nuevo marcador aparece en el mapa
```

### Por qué los marcadores se actualizan solos

`MarcadoresLugares` recibe `lugares` como prop. Cuando `setLugares(...)` actualiza el estado en `index.tsx`, React re-renderiza el componente automáticamente — no se necesita ningún efecto adicional.

---

## Trabajar sin los otros integrantes

Si los otros integrantes aún no terminaron, usar los placeholders en `_placeholders/placeholders.tsx`. Exportan las mismas interfaces y nombres que los componentes reales, por lo que `index.tsx` funciona sin cambios.

Para activarlos temporalmente, cambiar los imports en `index.tsx`:

```ts
// Temporales (placeholders)
import { MapaLugares, MarcadoresLugares, ModalNuevoLugar } from '@/_placeholders/placeholders';
import { insertarLugar, obtenerLugares, Lugar } from '@/_placeholders/placeholders';

// Reales (cuando estén listos)
import MapaLugares from '@/components/MapaLugares';
import MarcadoresLugares from '@/components/MarcadoresLugares';
import ModalNuevoLugar from '@/components/ModalNuevoLugar';
import { insertarLugar, obtenerLugares, Lugar } from '@/database/database';
```

---

## Demo (2-3 minutos)

### 1. Apertura y persistencia (30 seg)
- Abrir la app → el mapa se centra en la ubicación actual
- Si ya hay lugares guardados, los marcadores aparecen de inmediato (SQLite cargado en `useFocusEffect`)

### 2. Agregar un lugar (45 seg)
- Hacer **long press** en cualquier punto del mapa
- Aparece el modal con las coordenadas pre-llenadas
- Escribir nombre: `"Café Central"` y descripción: `"El mejor café del barrio"`
- Tocar **Guardar** → el marcador aparece en el mapa instantáneamente

### 3. Persistencia real (30 seg)
- Cerrar la app completamente
- Volver a abrirla → los marcadores siguen en el mapa
- Explicar: los datos están en SQLite, no en memoria

### 4. Callout (20 seg)
- Tocar un marcador existente
- Aparece el Callout con nombre y descripción
- Demostrar con dos marcadores diferentes

### 5. Re-renderizado reactivo (15 seg)
- Agregar un segundo lugar sin recargar
- Señalar que el marcador aparece inmediatamente gracias a la reactividad de React

---

## Stack técnico

| Tecnología | Uso |
|-----------|-----|
| React Native | UI móvil |
| Expo / expo-router | Navegación y build |
| react-native-maps | Mapa y marcadores |
| expo-sqlite | Persistencia local |
| TypeScript | Tipado estático |
| `useFocusEffect` | Recarga al enfocar pantalla |
