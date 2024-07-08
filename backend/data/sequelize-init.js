import { Sequelize } from "sequelize";

// Crear una instancia de Sequelize
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/db.sqlite",
  host: "localhost",
  logs: console.log //habilita logs
});

// Conectar a la base de datos
export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("Conexión establecida con la base de datos")
  } catch(error) {
    console.error("Error al conectar con la base de datos: ", error)
  }
}
