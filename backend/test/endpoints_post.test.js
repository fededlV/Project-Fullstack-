import request from "supertest";
import { app } from "../gestionEscolar.js";

const testPostEndpoint = (
  endpoint,
  expectedStatusCode = 201,
  expectedSendBody = null,
  expectedBody = null
) => {
  it(`Deberia responder con un codigo ${expectedStatusCode}`, async () => {
    await request(app).post(endpoint).send(expectedSendBody); //Envia el cuerpo de la solicitud si expectedSendBody no es nulo
    expect(async (res) => {
      expect(res.statusCode).toBe(expectedStatusCode);
      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  });
};

const testPostEndpointError = (
  endpoint,
  expectedStatusCode,
  expectedBody = null
) => {
  it(`Deberia responder con un codigo ${expectedStatusCode}`, async () => {
    await request(app).post(endpoint);
    expect(async (res) => {
      expect(res.statusCode).toBe(expectedStatusCode);
      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  });
};

describe("Pruebas para los endpoints POST de la api gestionEscolar", () => {
  describe("Pruebas para el endpoint POST", () => {
    const postTests = [
      {
        endpoint: "/gestionEscolar/estudiantes",
        expectedBodySend: {
          Nombre: "Juan",
          Apellido: "Perez",
          Fecha_nacimiento: "2000-01-01",
          Direccion: "Calle 123",
          Telefono: "123456789",
          Email: "juanperez@hotmail.com",
        },
        expectedBody: {
          Id_Estudiante: expect.any(Number),
          Nombre: "Juan",
          Apellido: "Perez",
          Fecha_nacimiento: "2000-01-01",
          Direccion: "Calle 123",
          Telefono: "123456789",
          Email: "juanperez@hotmail.com",
        },
      },
      {
        endpoint: "/gestionEscolar/profesores",
        expectedBodySend: {
          Nombre: "Juan",
          Apellido: "Perez",
          Fecha_nacimiento: "2000-01-01",
          Direccion: "Calle 123",
          Telefono: "123456789",
          Email: "juanperez@hotmail",
        },
        expectedBody: {
          Id_Profesor: expect.any(Number),
          Nombre: "Juan",
          Apellido: "Perez",
          Fecha_nacimiento: "2000-01-01",
          Direccion: "Calle 123",
          Telefono: "123456789",
          Email: "juanperez@hotmail",
        },
      },
      {
        endpoint: "/gestionEscolar/cursos",
        expectedBodySend: {
          Nombre: "Curso de prueba",
          Descripcion: "Descripcion de prueba",
          Fecha_Inicio: "2021-01-01",
          Fecha_Fin: "2021-06-01",
        },
        expectedBody: {
          Id_Curso: expect.any(Number),
          Nombre: "Curso de prueba",
          Descripcion: "Descripcion de prueba",
          Fecha_Inicio: "2021-01-01",
          Fecha_Fin: "2021-06-01",
        },
      },
      {
        endpoint: "/gestionEscolar/asignaturas",
        expectedBodySend: {
          Nombre: "Asignatura de prueba",
          Descripcion: "Descripcion de prueba",
        },
        expectedBody: {
          Id_Asignatura: expect.any(Number),
          Nombre: "Asignatura de prueba",
          Descripcion: "Descripcion de prueba",
        },
      },
      {
        endpoint: "/gestionEscolar/materiales",
        expectedBodySend: {
          Nombre: "Material de prueba",
          Descripcion: "Descripcion de prueba",
          Tipo_Material: "Libro",
          URL: "https://www.google.com",
          Id_Curso: 1,
        },
        expectedBody: {
          Id_Material: expect.any(Number),
          Nombre: "Material de prueba",
          Descripcion: "Descripcion de prueba",
          Tipo_Material: "Libro",
          URL: "https://www.google.com",
          Id_Curso: 1,
        },
      },
      {
        endpoint: "/gestionEscolar/actividadesExtracurriculares",
        expectedBodySend: {
          Nombre: "Actividad de prueba",
          Descripcion: "Descripcion de prueba",
          Fecha: "2021-01-01",
          Id_Profesor: 1,
        },
      },
      {
        endpoint: "/gestionEscolar/matriculas",
        expectedBodySend: {
          Fecha_Matricula: "2021-01-01",
          Id_Estudiante: 1,
          Id_Curso: 1,
        },
        expectedBody: {
          Id_Matricula: expect.any(Number),
          Fecha_Matricula: "2021-01-01",
          Id_Estudiante: 1,
          Id_Curso: 1,
        },
      },
      {
        endpoint: "/gestionEscolar/horarios",
        expectedBodySend: {
          Dia: "Prueba",
          Hora_Inicio: "08:00",
          Hora_Fin: "10:00",
          Aula: "Aula 101",
          Id_Asignatura: 1,
          Id_Curso: 1,
          Id_Profesor: 1,
        },
        expectedBody: {
          Id_Horarios: expect.any(Number),
          Dia: "Prueba",
          Hora_Inicio: "08:00",
          Hora_Fin: "10:00",
          Aula: "Aula 101",
          Id_Asignatura: 1,
          Id_Curso: 1,
          Id_Profesor: 1,
        },
      },
      {
        endpoint: "/gestionEscolar/calificaciones",
        expectedBodySend: {
          Nota: 7.5,
          Fecha: "2021-01-01",
          Estudiante_Id: 1,
          Asignatura_Id: 1,
        },
        expectedBody: {
          Id_Calificacion: expect.any(Number),
          Nota: 7.5,
          Fecha: "2021-01-01",
          Estudiante_Id: 1,
          Asignatura_Id: 1,
        },
      },
      {
        endpoint: "/gestionEscolar/asistencias",
        expectedBodySend: {
          Fecha: "2021-01-01",
          Asistio: true,
          Id_Estudiante: 1,
          Id_Horarios: 1,
        },
        expectedBody: {
          Id_Asistencia: expect.any(Number),
          Fecha: "2021-01-01",
          Asistio: true,
          Id_Estudiante: 1,
          Id_Horarios: 1,
        },
      },
    ];
    postTests.forEach((test) => {
      testPostEndpoint(
        test.endpoint,
        201,
        test.expectedBodySend,
        test.expectedBody
      );
    });
    //Test con errores
    describe("Pruebas para el endpoint POST con error 400", () => {
      const postTestsError = [
        {
          endpoint: "/gestionEscolar/estudiantes",
          expectedBodySend: {
            Nombre: "Jhon",
            Apellido: "Doe",
            Fecha_nacimiento: "2000-01-15",
            Direccion: "123 Main St, Anytown, USA",
            Telefono: "555-1234",
            Email: "jhon.doe@example.com",
          },
          expectedBody: {
            mensaje: "El estudiante ya existe",
          },
        },
        {
          endpoint: "/gestionEscolar/profesores",
          expectedBodySend: {
            Nombre: "Ana",
            Apellido: "García",
            Fecha_Nacimiento: "1965-03-20",
            Especialidad: "Matemáticas",
            Telefono: "555-1234",
            Email: "ana.garcia@example.com",
          },
          expectedBody: {
            mensaje: "El profesor ya existe",
          },
        },
        {
          endpoint: "/gestionEscolar/cursos",
          expectedBodySend: {
            Nombre: "Analisis Matemático 1",
            Descripcion: "Curso de Analisis Matematico 1",
            Fecha_Inicio: "2021-09-01",
            Fecha_Fin: "2022-06-30",
          },
          expectedBody: {
            mensaje: "El curso ya existe",
          },
        },
        {
          endpoint: "/gestionEscolar/asignaturas",
          expectedBodySend: {
            Nombre: "Cálculo Diferencial",
            Descripcion: "Estudio de las derivadas y sus aplicaciones",
          },
          expectedBody: {
            mensaje: "La asignatura ya existe",
          },
        },
        {
          endpoint: "/gestionEscolar/materiales",
          expectedBodySend: {
            Nombre: "Presentacion sobre la historia del arte",
            Tipo_Material: "PDF",
            URL: "https://www.museodelprado.es/en",
            Id_Curso: 12,
          },
          expectedBody: {
            mensaje: "El material ya existe",
          },
        },
        {
          endpoint: "/gestionEscolar/actividadesExtracurriculares",
          expectedBodySend: {
            Nombre: "Taller de teatro",
            Descripcion:
              "En este taller, los alumnos aprenderán técnicas básicas de actuación, improvisación y expresión corporal.",
            Fecha: "2024-06-10",
            Id_Profesor: 23,
          },
          expectedBody: {
            mensaje: "La actividad ya existe",
          },
        },
        {
          endpoint: "/gestionEscolar/matriculas",
          expectedBodySend: {
            Fecha_Matricula: "2021-01-01",
            Id_Estudiante: 1,
            Id_Curso: 1,
          },
          expectedBody: {
            mensaje: "La matricula ya existe",
          },
        },
        {
          endpoint: "/gestionEscolar/horarios",
          expectedBodySend: {
            Dia: "Lunes",
            Hora_Inicio: "08:00",
            Hora_Fin: "10:00",
            Aula: "Aula 101",
            Id_Asignatura: 1,
            Id_Curso: 1,
            Id_Profesor: 1,
          },
          expectedBody: {
            mensaje: "El horario ya existe",
          },
        },
      ];
      postTestsError.forEach((test) => {
        testPostEndpointError(
          test.endpoint,
          400,
          test.expectedBodySend,
          test.expectedBody
        );
      });
    });
  });
});
