import request from "supertest";
import { app } from "../gestionEscolar.js";

const testPutEndpoint = (
  endpoint,
  updateData,
  expectedStatusCode = 200,
  expectedBody = null
) => {
  it(`Debería responder con un código ${expectedStatusCode}`, async () => {
    await request(app).put(endpoint).send(updateData);
    expect(async (res) => {
      expect(res.statusCode).toBe(expectedStatusCode);

      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  }, 10000);
};

const testPutEndpointError = (
  endpoint,
  updateData,
  expectedStatusCode,
  expectedBody = null
) => {
  it(`Debería responder con un código ${expectedStatusCode}`, async () => {
    await request(app).put(endpoint).send(updateData);
    expect(async (res) => {
      expect(res.statusCode).toBe(expectedStatusCode);
      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  });
};

describe("Pruebas para los endpoints PUT de la api gestionEscolar", () => {
  describe("Pruebas para el endpoint PUT de la api gestionEscolar", () => {
    const updateTests = [
      {
        endpoint: "/gestionEscolar/estudiantes/1",
        updateData: {
          Nombre: "Jane",
          Apellido: "Doe",
          Fecha_nacimiento: "2000-01-16",
          Direccion: "124 Main St, Anytown, USA",
          Telefono: "555-5678",
          Email: "jane.doe@example.com",
        },
        expectedBody: {
          Id_Estudiante: 1,
          Nombre: "Jane",
          Apellido: "Doe",
          Fecha_nacimiento: "2000-01-16",
          Direccion: "124 Main St, Anytown, USA",
          Telefono: "555-5678",
          Email: "jane.doe@example.com",
        },
      },
      {
        endpoint: "/gestionEscolar/profesores/1",
        updateData: {
          Nombre: "Ana María",
          Apellido: "García López",
          Fecha_Nacimiento: "1965-03-21",
          Especialidad: "Física",
          Telefono: "555-5678",
          Email: "ana.maria.garcia@example.com",
        },
        expectedBody: {
          Id_Profesor: 1,
          Nombre: "Ana María",
          Apellido: "García López",
          Fecha_Nacimiento: "1965-03-21",
          Especialidad: "Física",
          Telefono: "555-5678",
          Email: "ana.maria.garcia@example.com",
        },
      },
      {
        endpoint: "/gestionEscolar/cursos/1",
        update: {
          Nombre: "Analisis Matemático 1",
          Descripcion: "Curso de Analisis Matematico 1",
          Fecha_Inicio: "2021-09-01",
          Fecha_Fin: "2022-06-30",
        },
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
        update: {
          Nombre: "Cálculo Diferencial",
          Descripcion: "Estudio de las derivadas y sus aplicaciones",
        },
        expectedBody: {
          Id_Asignatura: 1,
          Nombre: "Cálculo Diferencial",
          Descripcion: "Estudio de las derivadas y sus aplicaciones",
        },
      },
      {
        endpoint: "/gestionEscolar/horarios/1",
        update: {
          Dia: "Lunes",
          Hora_Inicio: "08:00",
          Hora_Fin: "10:00",
          Aula: "Aula 101",
          Asignatura_Id: 1,
          Curso_Id: 1,
          Profesor_Id: 1,
        },
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
        update: {
          Nota: 7.5,
          Fecha: "2024-05-10",
          Estudiante_Id: 1,
          Asignatura_Id: 1,
        },
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
        update: {
          Fecha: "2023-07-31",
          Asistio: true,
          Id_Estudiante: 35,
          Id_Horario: 15,
        },
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
        update: {
          Descripcion: "Presentación sobre la historia del arte",
          Tipo_Material: "PDF",
          URL: "https://www.museodelprado.es/en",
          Id_Curso: 12,
        },
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
        update: {
          Nombre: "Taller de teatro",
          Descripcion:
            "En este taller, los alumnos aprenderán técnicas básicas de actuación, improvisación y expresión corporal.",
          Fecha: "2024-06-10",
          Id_Profesor: 23,
        },
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
        update: {
          Fecha_Matricula: "2024-06-03",
          Id_Estudiante: 27,
          Id_Curso: 39,
        },
        expectedBody: {
          Id_Matricula: 1,
          Fecha_Matricula: "2024-06-03",
          Id_Estudiante: 27,
          Id_Curso: 39,
        },
      },

      // Agrega más pruebas para otros endpoints según sea necesario
    ];

    updateTests.forEach((test) => {
      testPutEndpoint(test.endpoint, test.updateData, 200, test.expectedBody);
    });

    describe("Debería responder con un código 404 porque el registro con el id especificado no existe", () => {
      const errorTests = [
        {
          endpoint: "/gestionEscolar/estudiantes/99",
          updateData: {
            Nombre: "Nombre No Existente",
          },
          expectedBody: { mensaje: "Estudiante no encontrado" },
        },
        {
          endpoint: "/gestionEscolar/profesores/99",
          updateData: {
            Nombre: "Nombre No Existente",
          },
          expectedBody: { mensaje: "Profesor no encontrado" },
        },
        {
          endpoint: "/gestionEscolar/cursos/99",
          updateData: {
            Nombre: "Nombre No Existe",
          },
          expectedBody: { mensaje: "Curso no encontrado" },
        },
        {
          endpoint: "/gestionEscolar/asignaturas/99",
          updateData: {
            Nombre: "Nombre No Existe",
          },
          expectedBody: { mensaje: "Asignatura no encontrada" },
        },
        {
          endpoint: "/gestionEscolar/horarios/99",
          updateData: {
            Dia: "Dia No Existe",
            Hora_Inicio: "Hora Inicio No Existe",
          },
          expectedBody: {
            mensaje: "No se encontraron horarios para la asignatura indicada.",
          },
        },
        {
          endpoint: "/gestionEscolar/calificaciones/99",
          updateData: {
            Estudiante_Id: "Estudiante No Existe",
            Asignatura_Id: "Asignatura No Existe",
          },
          expectedBody: {
            mensaje: "Calificacion no encontrada para el alumno indicado",
          },
        },
        {
          endpoint: "/gestionEscolar/asistencias/99",
          updateData: {
            Fecha: "Fecha No Existe",
          },
          expectedBody: { mensaje: "No se encontraron asistencias" },
        },
        {
          endpoint: "/gestionEscolar/materiales/99",
          updateData: {
            Descripcion: "Descripcion No Existe",
          },
          expectedBody: { mensaje: "No se encontraron materiales." },
        },
        {
          endpoint: "/gestionEscolar/actividadesExtracurriculares/99",
          updateData: {
            Nombre: "Nombre No Existe",
          },
          expectedBody: {
            mensaje: "No se encontraron actividades extracurriculares",
          },
        },
        {
          endpoint: "/gestionEscolar/matriculas/99",
          updateData: {
            Fecha_Matricula: "Fecha No Encontrada",
            Id_Estudiante: "Estudiante No Encontrado",
          },
          expectedBody: { mensaje: "No se encontraron matriculas" },
        },
      ];

      errorTests.forEach((test) => {
        testPutEndpointError(
          test.endpoint,
          test.updateData,
          404,
          test.expectedBody
        );
      });
    });

    describe("Debería responder con un código 400 por datos inválidos", () => {
      const invalidTests = [
        {
          endpoint: "/gestionEscolar/estudiantes/1",
          updateData: {
            Nombre: "", // Nombre vacío
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/profesores/1",
          updateData: {
            Especialidad: "", // Especialidad vacía
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/cursos/1",
          updateData: {
            Nombre: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/asignaturas/1",
          updateData: {
            Nombre: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/horarios/1",
          updateData: {
            Dia: "",
            Hora_Inicio: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/calificaciones/1",
          updateData: {
            Estudiante_Id: "",
            Asignatura_Id: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/asistencias/1",
          updateData: {
            Fecha: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/materiales/1",
          updateData: {
            Descripcion: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/actividadesExtracurriculares/1",
          updateData: {
            Nombre: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
        {
          endpoint: "/gestionEscolar/matriculas/1",
          updateData: {
            Id_Estudiante: "",
            Fecha_Matricula: "",
          },
          expectedBody: { mensaje: "Datos inválidos" },
        },
      ];

      invalidTests.forEach((test) => {
        testPutEndpointError(
          test.endpoint,
          test.updateData,
          400,
          test.expectedBody
        );
      });
    });
  });
});
