import * as SQLite from "expo-sqlite";

export type Lugar = {
  id: number;
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  imagen_uri: string;
};

let db: SQLite.SQLiteDatabase | null = null;

function getDB(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync("lugares.db");
  }
  return db;
}

export function inicializarDB(): void {
  const database = getDB();
  database.execSync(`
    CREATE TABLE IF NOT EXISTS lugares (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre      TEXT    NOT NULL,
      descripcion TEXT    NOT NULL DEFAULT '',
      latitud     REAL    NOT NULL,
      longitud    REAL    NOT NULL,
      imagen_uri  TEXT    NOT NULL DEFAULT ''
    );
  `);
}

export function insertarLugar(
  nombre: string,
  descripcion: string,
  latitud: number,
  longitud: number,
  imagen_uri: string
): number {
  const database = getDB();
  const result = database.runSync(
    `INSERT INTO lugares (nombre, descripcion, latitud, longitud, imagen_uri)
      VALUES (?, ?, ?, ?, ?);`,
    nombre,
    descripcion,
    latitud,
    longitud,
    imagen_uri
  );
  return result.lastInsertRowId;
}

export function obtenerLugares(): Lugar[] {
  const database = getDB();
  return database.getAllSync<Lugar>(
    `SELECT id, nombre, descripcion, latitud, longitud, imagen_uri
      FROM lugares
      ORDER BY id DESC;`
  );
}
