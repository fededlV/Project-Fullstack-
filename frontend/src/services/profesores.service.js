import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/profesores";

const getProfesores = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los profesores: ", error);
    throw error;
  }
};

const getProfesor = async (profesorId) => {
  try {
    console.log(profesorId);
    const response = await axios.get(`${url}/${profesorId}`);
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

const getNomProfesor = async (profesorNombre) => {
  try {
    const response = await axios.get(`${url}?nombre=${profesorNombre}`);
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

const createProfesor = async (profesor) => {
  try {
    const response = await axios.post(url, profesor, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el profesor: ", error);
    throw error;
  }
};


const updateProfesor = async (id, profesor) => {
  try {
    const response = await axios.put(`${url}/${id}`, profesor, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el profesor: ", error);
    throw error;
  }
};

const deleteProfesor = async (profesorId) => {
  try {
    console.log("Se intenta eliminar el profesor con id: ", profesorId);
    await axios.delete(`${url}/${profesorId}`);
  } catch (error) {
    console.error("Error al eliminar el profesor: ", error);
    throw error;
  }
};

const profesoresService = {
  getProfesores,
  getProfesor,
  getNomProfesor,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};

export default profesoresService;

