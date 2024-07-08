import express from "express";
import estudiantesRouter from "./routes/Estudiantes.js";
import calificacionesRouter from "./routes/Calificaciones.js";
import horariosRouter from "./routes/Horarios.js";
import profesoresRouter from "./routes/Profesores.js";
import cursosRouter from "./routes/Cursos.js";
import asignaturasRouter from "./routes/Asignaturas.js";
import actExtracurricularesRouter from "./routes/ActExtracurriculares.js";
import asistenciaRouter from "./routes/Asistencia.js";
import materialRouter from "./routes/MaterialCurso.js";
import matriculasRouter from "./routes/Matriculas.js";
import { dbInit } from "./data/dbInit.js";
import { connectDB } from "./data/sequelize-init.js";
import cors from "cors";

let port = 3001;
export const app = express();

app.use(cors());
app.use(express.json());

app.use("/gestionEscolar", estudiantesRouter);
app.use("/gestionEscolar", calificacionesRouter);
app.use("/gestionEscolar", horariosRouter);
app.use("/gestionEscolar", profesoresRouter);
app.use("/gestionEscolar", cursosRouter);
app.use("/gestionEscolar", asignaturasRouter);
app.use("/gestionEscolar", actExtracurricularesRouter);
app.use("/gestionEscolar", asistenciaRouter);
app.use("/gestionEscolar", materialRouter);
app.use("/gestionEscolar", matriculasRouter);

const startServer = async () => {
  try {
    await connectDB();
    await dbInit().catch((error) =>
      console.error(
        "Error durante la inicializacion de la base de datos: ",
        error
      )
    );
    app.listen(port, () => {
      console.log(`Server corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor", error);
  }
};
startServer();
