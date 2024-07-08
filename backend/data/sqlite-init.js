import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Esta funcion se encarga de la conexion a la base de datos.
const connect = async () => {
  const db = await open({
    filename: "data/db.sqlite",
    driver: sqlite3.Database,
  });
  return db;
};

export { connect };
