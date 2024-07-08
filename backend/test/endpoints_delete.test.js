import request from "supertest";
import { app } from "../gestionEscolar";

const testDeleteEndpoint = (
  endpoint,
  expecetedStatusCode = 200,
  expectedBody
) => {
  it(`Deberia responder con un codigo ${expecetedStatusCode}`, async () => {
    await request(app).delete(endpoint);
    expect(async (res) => {
      expect(res.statusCode).toBe(expecetedStatusCode);
      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  });
};

const testDeleteEndpointError = (
  endpoint,
  expecetedStatusCode,
  expectedBody
) => {
  it(`Deberia responder con un codigo ${expecetedStatusCode}`, async () => {
    await request(app).delete(endpoint);
    expect(async (res) => {
      expect(res.statusCode).toBe(expecetedStatusCode);
      if (expectedBody) {
        expect(res.body).toEqual(expectedBody);
      }
    });
  });
};

describe("Pruebas para los enpoints DELETE de la API", () => {
  describe("Pruebas para el DELETE", () => {
    const testDelete = [
      {
        endpoint: "/gestionEscolar/horarios/1",
        expectedStatusCode: 204,
      },
      {
        endpoint: "/gestionEscolar/asistencias/1",
        expectedStatusCode: 200,
        expectedBody: { mensaje: "Asistencia del alumno eliminada." },
      },
      {
        endpoint: "/gestionEscolar/calificaciones/1",
        expectedStatusCode: 204,
      },
      {
        endpoint: "/gestionEscolar/matriculas/1",
        expectedStatusCode: 204,
      },
      {
        endpoint: "/gestionEscolar/actividadesExtracurriculares/1",
        expecetedStatusCode: 200,
        expectedBody: { mensaje: "Actividad extracurricular eliminada." },
      },
      {
        endpoint: "/gestionEscolar/materiales/1",
        expectedStatusCode: 200,
        expectedBody: { mensaje: "Material eliminado." },
      },
    ];
    testDelete.forEach((test) => {
      testDeleteEndpoint(
        test.endpoint,
        test.expectedStatusCode,
        test.expectedBody
      );
    });
    describe("Pruebas para DELETE con error", () => {
      const error = [
        {
          endpoint: "/gestionEscolar/horarios/99",
          expectedBody: {
            mensaje: "Horario no encontrado",
          },
        },
        {
          endpoint: "/gestionEscolar/calificaciones/99",
          expectedBody: {
            mensaje: "Calificación no encontrada",
          },
        },
        {
          endpoint: "/gestionEscolar/asistencias/99",
          expectedBody: { mensaje: "Asistencia del alumno no encontrada." },
        },
        {
          endpoint: "/gestionEscolar/materiales/99",
          expectedBody: { mensaje: "No se encontró el material." },
        },
        {
          endpoint: "/gestionEscolar/actividadesExtracurriculares/99",
          expectedBody: {
            mensaje: "No se encontró la actividad extracurricular con ese ID",
          },
        },
        {
          endpoint: "/gestionEscolar/matriculas/99",
          expectedBody: { mensaje: "La matricula no existe" },
        },
      ];
      error.forEach((error) => {
        testDeleteEndpointError(error.endpoint, 404, error.expectedBody);
      });
    });
    describe("Pruebas para DELETE con error 500", () => {
      const errorGroso = [
        {
          endpoint: "/gestionEscolar/estudiantes/1",
          expectedBody: { mensaje: "Error del servidor: " },
        },
        {
          endpoint: "/gestionEscolar/profesores/1",
          expectedBody: { mensaje: "Error del servidor: " },
        },
        {
          endpoint: "/gestionEscolar/cursos/1",
          expectedBody: { mensaje: "Error del servidor: " },
        },
        {
          endpoint: "/gestionEscolar/asignaturas/1",
          expectedBody: { mensaje: "Error del servidor: " },
        },
      ];
      errorGroso.forEach((error) => {
        testDeleteEndpointError(error.endpoint, 500, error.expectedBody);
      });
    });
  });
});
