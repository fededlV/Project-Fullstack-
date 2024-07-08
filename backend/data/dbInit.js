import { createTables } from "./createTables.js";
import { insertData } from "./insertData.js";
import { sequelize } from "./sequelize-init.js";

// Esta funcion se encarga de inicializar la base de datos, creando las tablas y llenandolas con datos de prueba. Ademas de esto, si la base de datos ya estaba creada, desactiva las restricciones de clave foranea, elimina las tablas y las vuelve a crear.
export const dbInit = async () => {
  await sequelize.query("PRAGMA foreign_keys = OFF");
  await sequelize.drop();
  await sequelize.query("PRAGMA foreign_keys = ON");
  await sequelize.sync({ force: true });
  await createTables();
  await insertData();
};

/* dbInit().catch((error) =>
  console.error("Error durante la inicializacion de la base de datos: ", error)
); */
