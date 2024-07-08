import request from "supertest";

import { app } from "../gestionEscolar.js";
import { sequelize } from "../data/sequelize-init.js";

//Esto de aqui permite controlar "open handles" es decir los manejadores abiertos. Para que jest pueda terminar cada test correctamente.
let server;
beforeAll((done) => {
  server = app.listen(3002, (err) => {
    if (err) {
      console.error("Error al iniciar el servidor: ", err);
      done(err);
    } else {
      console.log("Servidor iniciado en el puerto 3002");
      done();
    }
  }); //Inicia el servidor
});

afterAll((done) => {
  server.close((err) => {
    if (err) {
      console.error("Error al cerrar el servidor: ", err);
      done(err);
    }
    console.log("Servidor cerrado");
    done();
  }); //Cierra el servidor
});

/**
 * Se utilizan los hooks beforeAll y afterAll para asegurar que la conexion a la base de datos se realice correctamente y se
 * cierre correctamente. beforeAll nos ayuda a que los test se realicen despues de que se inicia la base de datos. afterAll
 * nos ayuda a que los test se realicen despues de que se cierra la base de datos.
 */
beforeAll(async () => {
  await sequelize.sync();
  await sequelize.sync({ force: true }); // Esto asegura que las migraciones se apliquen correctamente
});

afterAll(async () => {
  await sequelize.close();
});

const testGetEndpoint = (
  endpoint,
  expectedStatusCode = 200,
  expectedBody = null
) => {
  it(`Deberia responder con un codigo ${expectedStatusCode}`, async () => {
    await request(server).get(endpoint);
    expect(async (res) => {
      expect(res.statusCode).toBe(expectedStatusCode);
      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  });
};

const testGetEndpointError = (
  endpoint,
  expectedStatusCode,
  expectedBody = null
) => {
  it(`Deberia responder con un codigo ${expectedStatusCode}`, async () => {
    await request(server).get(endpoint);
    expect(async (res) => {
      expect(res.statusCode).toBe(expectedStatusCode);
      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  });
};

describe("Pruebas para los endpoints GET de la api gestionEscolar", () => {
  //Se realiza el test del endpoint GET de todos las tablas que conforman a nuestra API gestionEscolar, es el endpoint get donde se obtienen todos los registros de cada tabla.
  describe("Pruebas para el endpoint GET principal de la api gestionEscolar", () => {
    const endpoints = [
      "/gestionEscolar/estudiantes",
      "/gestionEscolar/profesores",
      "/gestionEscolar/cursos",
      "/gestionEscolar/asignaturas",
      "/gestionEscolar/horarios",
      "/gestionEscolar/calificaciones",
      "/gestionEscolar/asistencias",
      "/gestionEscolar/materiales",
      "/gestionEscolar/actividadesExtracurriculares",
      "/gestionEscolar/matriculas",
    ];
    endpoints.forEach((endpoint) => {
      testGetEndpoint(endpoint);
    });
  });
  //Test para el endpoint GET de un registro espcificado por ID.
  describe("Pruebas para el endpoint GET de un registro espcecificado por su ID o un ID especificado", () => {
    const specificTests = [
      {
        endpoint: "/gestionEscolar/estudiantes/1",
        expectedBody: {
          Id_Estudiante: 1,
          Nombre: "John",
          Apellido: "Doe",
          Fecha_nacimiento: "2000-01-15",
          Direccion: "123 Main St, Anytown, USA",
          Telefono: "555-1234",
          Email: "john.doe@example.com",
        },
      },
      {
        endpoint: "/gestionEscolar/profesores/1",
        expectedBody: {
          Id_Profesor: 1,
          Nombre: "Ana",
          Apellido: "García",
          Fecha_Nacimiento: "1965-03-20",
          Especialidad: "Matemáticas",
          Telefono: "555-1234",
          Email: "ana.garcia@example.com",
        },
      },
      {
        endpoint: "/gestionEscolar/cursos/1",
        expectedBody: {
          Id_Curso: 1,
          Nombre: "Analisis Matemático 1",
          Descripcion: "Curso de Analisis Matematico 1",
          Fecha_Inicio: "2021-09-01",
          Fecha_Fin: "2022-06-30",
        },
      },
      {
        endpoint: "/gestionEscolar/asignaturas/1",
        expectedBody: {
          Id_Asignatura: 1,
          Nombre: "Cálculo Diferencial",
          Descripcion: "Estudio de las derivadas y sus aplicaciones",
        },
      },
      {
        endpoint: "/gestionEscolar/horarios/1",
        expectedBody: {
          Id_Horarios: 1,
          Dia: "Lunes",
          Hora_Inicio: "08:00",
          Hora_Fin: "10:00",
          Aula: "Aula 101",
          Asignatura_Id: 1,
          Curso_Id: 1,
          Profesor_Id: 1,
        },
      },
      {
        endpoint: "/gestionEscolar/calificaciones/1",
        expectedBody: {
          Id_Calificacion: 1,
          Nota: 7.5,
          Fecha: "2024-05-10",
          Estudiante_Id: 1,
          Asignatura_Id: 1,
        },
      },
      {
        endpoint: "/gestionEscolar/asistencias/35",
        expectedBody: {
          Id_Asistencia: 1,
          Fecha: "2023-07-31",
          Asistio: true,
          Id_Estudiante: 35,
          Id_Horario: 15,
        },
      },
      {
        endpoint: "/gestionEscolar/materiales/12",
        expectedBody: {
          Id_Material: 1,
          Descripcion: "Presentación sobre la historia del arte",
          Tipo_Material: "PDF",
          URL: "https://www.museodelprado.es/en",
          Id_Curso: 12,
        },
      },
      {
        endpoint: "/gestionEscolar/actividadesExtracurriculares/23",
        expectedBody: {
          Id_Actividad: 1,
          Nombre: "Taller de teatro",
          Descripcion:
            "En este taller, los alumnos aprenderán técnicas básicas de actuación, improvisación y expresión corporal.",
          Fecha: "2024-06-10",
          Id_Profesor: 23,
        },
      },
      {
        endpoint: "/gestionEscolar/matriculas/27",
        expectedBody: {
          Id_Matricula: 1,
          Fecha_Matricula: "2024-06-03",
          Id_Estudiante: 27,
          Id_Curso: 39,
        },
      },
    ];
    specificTests.forEach((test) => {
      testGetEndpoint(test.endpoint, 200, test.expectedBody);
    });

    // Test cases for error scenarios
    describe("Debería responder con un código 404 porque el estudiante con el id especificado no existe", () => {
      const error = [
        {
          endpoint: "/gestionEscolar/estudiantes/99",
          expectedBody: { mensaje: "Estudiante no encontrado " },
        },
        {
          endpoint: "/gestionEscolar/profesores/99",
          expectedBody: { mensaje: "Profesor no encontrado" },
        },
        {
          endpoint: "/gestionEscolar/cursos/99",
          expectedBody: { mensaje: "Curso no encontrado" },
        },
        {
          endpoint: "/gestionEscolar/asignaturas/99",
          expectedBody: { mensaje: "Asignatura no encontrada" },
        },
        {
          endpoint: "/gestionEscolar/horarios/99",
          expectedBody: {
            mensaje: "No se encontraron horarios para la asignatura indicada.",
          },
        },
        {
          endpoint: "/gestionEscolar/calificaciones/99",
          expectedBody: {
            mensaje: "Calificacion no encontrada para el alumno indicado",
          },
        },
        {
          endpoint: "/gestionEscolar/asistencias/99",
          expectedBody: { mensaje: "No se encontraron asistencias" },
        },
        {
          endpoint: "/gestionEscolar/materiales/99",
          expectedBody: { mensaje: "No se encontraron materiales." },
        },
        {
          endpoint: "/gestionEscolar/actividadesExtracurriculares/99",
          expectedBody: {
            mensaje: "No se encontraron actividades extracurriculares",
          },
        },
        {
          endpoint: "/gestionEscolar/matriculas/99",
          expectedBody: { mensaje: "No se encontraron matriculas" },
        },
      ];
      error.forEach((error) => {
        testGetEndpointError(error.endpoint, 404, error.expectedBody);
      });
    });

    describe("Debería responder con un código 400 por formato de id inválido", () => {
      const invalid = [
        "/gestionEscolar/estudiantes/invalidId",
        "/gestionEscolar/profesores/invalidId",
        "/gestionEscolar/cursos/invalidId",
        "/gestionEscolar/asignaturas/invalidId",
        "/gestionEscolar/horarios/invalidId",
        "/gestionEscolar/calificaciones/invalidId",
        "/gestionEscolar/asistencias/invalidId",
        "/gestionEscolar/materiales/invalidId",
        "/gestionEscolar/actividadesExtracurriculares/invalidId",
        "/gestionEscolar/matriculas/invalidId",
      ];
      invalid.forEach((endpoint) => {
        testGetEndpointError(endpoint, 400, {
          mensaje: "El formato del id es invalido",
        });
      });
    });
  });
});
