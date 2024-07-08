import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/calificaciones";

const getCalificaciones = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las calificaciones: ", error);
      throw error;
    }
  };

const getCalificacionEstudiante = async (nombre) => {
  try {
    const response = await axios.get(`${url}?nombre=${nombre}`);
    return response.data[0];
  } catch (error) {
    console.error("Error al obtener la calificación del estudiante: ", error);
    throw error;
  }
}
  
  const getCalificacion = async (id) => { // solo una calificación
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la calificación: ", error);
      throw error;
    }
  };
  
  const createCalificacion = async (calificacion) => {
    try {
      const response = await axios.post(url, calificacion, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear la calificación: ", error);
      throw error;
    }
  };
  
  const updateCalificacion = async (id, calificacion) => {
    try {
      const response = await axios.put(`${url}/${id}`, calificacion, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la calificación: ", error);
      throw error;
    }
  };
  
  const deleteCalificacion = async (calificacionId) => {
    try {
      console.log("Se intenta eliminar la calificación con id: ", calificacionId);
      const response = await axios.delete(`${url}/${calificacionId}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error al eliminar la calificación: ", error);
      throw error;
    }
  };
  
  const getEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/gestionEscolar/estudiantes");
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estudiantes: ", error);
      throw error;
    }
  };
  
  const getAsignaturas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/gestionEscolar/asignaturas");
      return response.data;
    } catch (error) {
      console.error("Error al obtener las asignaturas: ", error);
      throw error;
    }
  };
  
  const calificacionService = {
    getCalificaciones,
    getCalificacion,
    getCalificacionEstudiante,
    createCalificacion,
    updateCalificacion,
    deleteCalificacion,
    getEstudiantes,
    getAsignaturas,
  };
  
  export default calificacionService;