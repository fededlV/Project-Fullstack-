import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/estudiantes";

const getEstudiantes = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los estudiantes: ", error);
    throw error;
  }
};

const getEstudiante = async (estudianteId) => {
  try {
    console.log(estudianteId);
    const response = await axios.get(`${url}/${estudianteId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado diferente a 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
      return null;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("Error request:", error.request);
    } else {
      // Algo sucedió al configurar la solicitud que provocó un error
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

//Obtener estudiante por Nombre
const getNomEstudiante = async (estudianteNombre) => {
  try {
    const response = await axios.get(`${url}?nombre=${estudianteNombre}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado diferente a 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
      return null;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("Error request:", error.request);
    } else {
      // Algo sucedió al configurar la solicitud que provocó un error
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

const createEstudiante = async (estudiante) => {
  try {
    const response = await axios.post(url, estudiante, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el estudiante: ", error);
    throw error;
  }
};

const updateEstudiante = async (id, estudiante) => {
  try {
    const response = await axios.put(`${url}/${id}`, estudiante, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estudiante: ", error);
    throw error;
  }
};

const deleteEstudiante = async (estudianteId) => {
  try {
    console.log("Se intenta eliminar el estudiante con id: ", estudianteId);
    await axios.delete(`${url}/${estudianteId}`);
  } catch (error) {
    console.error("Error al eliminar el estudiante: ", error);
    throw error;
  }
};

const estudiantesService = {
  getEstudiantes,
  getEstudiante,
  getNomEstudiante,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
};

export default estudiantesService;
