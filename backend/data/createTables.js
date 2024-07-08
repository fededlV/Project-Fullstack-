import { connect } from "./sqlite-init.js";

// Esta funcion se encarga de la creacion de las tablas que van a ser contenidas en nuestra base de datos.
export const createTables = async () => {
  const db = await connect();
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Estudiantes (
                Id_Estudiante INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre TEXT NOT NULL,
                Apellido TEXT NOT NULL,
                Fecha_nacimiento DATE NOT NULL,
                Direccion TEXT NOT NULL,
                Telefono TEXT NOT NULL,
                Email TEXT NOT NULL
            )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Profesores (
                Id_Profesor INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre TEXT NOT NULL,
                Apellido TEXT NOT NULL,
                Fecha_Nacimiento DATE NOT NULL,
                Especialidad TEXT NOT NULL,
                Telefono TEXT NOT NULL,
                Email TEXT NOT NULL
            )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Cursos (
                Id_Curso INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre TEXT NOT NULL,
                Descripcion TEXT,
                Fecha_Inicio DATE NOT NULL,
                Fecha_Fin DATE NOT NULL
            )`
    /* Año DATE NOT NULL */ //Preguntar al profe si podriamos replasar fecha_inicio y fecha_fin por año
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Asignaturas (
                Id_Asignatura INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre TEXT NOT NULL,
                Descripcion TEXT NOT NULL 
              )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Horarios (
                Id_Horarios INTEGER PRIMARY KEY AUTOINCREMENT,
                Dia TEXT NOT NULL,
                Hora_Inicio TIME NOT NULL,
                Hora_Fin TIME NOT NULL,
                Aula TEXT NOT NULL,
                Id_Asignatura INTEGER NOT NULL,
                Id_Curso INTEGER NOT NULL,
                Id_Profesor INTEGER NOT NULL,
                FOREIGN KEY (Id_Profesor) REFERENCES Profesores (Id_Profesor),
                FOREIGN KEY (Id_Asignatura) REFERENCES Asignaturas (Id_Asignatura),
                FOREIGN KEY (Id_Curso) REFERENCES Cursos(Id_Curso)
            )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Calificaciones (
                Id_Calificaciones INTEGER PRIMARY KEY AUTOINCREMENT,
                Nota FLOAT NOT NULL,
                Fecha DATE NOT NULL,
                Estudiante_Id INTEGER NOT NULL,
                Asignatura_Id INTEGER NOT NULL,
                FOREIGN KEY (Estudiante_Id) REFERENCES Estudiantes(Id_Estudiante),
                FOREIGN KEY (Asignatura_Id) REFERENCES Asignaturas(Id_Asignatura) 
            )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Asistencias (
                Id_Asistencia INTEGER PRIMARY KEY AUTOINCREMENT,
                Fecha DATE NOT NULL,
                Asistio BOOLEAN NOT NULL,
                Id_Estudiante INTEGER NOT NULL,
                Id_Horario INTEGER NOT NULL,
                FOREIGN KEY (Id_Estudiante) REFERENCES Estudiantes(Id_Estudiante),
                FOREIGN KEY (Id_Horario) REFERENCES Horarios(Id_Horarios)
            )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Material_Curso (
                Id_Material INTEGER PRIMARY KEY AUTOINCREMENT,
                Descripcion TEXT NOT NULL,
                Tipo_Material TEXT NOT NULL,
                URL TEXT NOT NULL,
                Id_Curso INTEGER NOT NULL,
                FOREIGN KEY (Id_Curso) REFERENCES Cursos(Id_Curso)
            )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Actividades_Extracurriculares (
                Id_Actividad INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre TEXT NOT NULL,
                Descripcion TEXT NOT NULL,
                Fecha DATE NOT NULL,
                Id_Profesor INTEGER NOT NULL,
                FOREIGN KEY (Id_Profesor) REFERENCES Profesores(Id_Profesor)
            )`
  );
  await db.exec(
    `CREATE TABLE IF NOT EXISTS Matriculas (
                Id_Matricula INTEGER PRIMARY KEY AUTOINCREMENT,
                Fecha_Matricula DATE NOT NULL,
                Id_Estudiante INTEGER NOT NULL,
                Id_Curso INTEGER NOT NULL,
                FOREIGN KEY (Id_Estudiante) REFERENCES Estudiantes(Id_Estudiante),
                FOREIGN KEY (Id_Curso) REFERENCES Cursos(Id_Curso)
            )`
  );
  console.log("Tables created successfully");
};
