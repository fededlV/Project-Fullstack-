import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/matriculas";

const getMatriculas = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las matriculas: ", error);
    throw error;
  }
};

const getMatricula = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado diferente a 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
      return null 
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

const getMatriculaEst = async (estudianteNombre) => {
  try {
    const response = await axios.get(`${url}?nombre=${estudianteNombre}`);
    return response.data[0]
  } catch(error) {
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
}

const createMatricula = async (matricula) => {
  try {
    const response = await axios.post(url, matricula, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la matricula: ", error);
    throw error;
  }
};

const updateMatricula = async (id, matricula) => {
  try {
    const response = await axios.put(`${url}/${id}`, matricula, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la matricula: ", error);
    throw error;
  }
};

const deleteMatricula = async (id) => {
  try {
    console.log("Se intenta eliminar el material del curso con id: ", id);
    await axios.delete(`${url}/${id}`);
  } catch (error) {
    console.error("Error al eliminar matricula: ", error);
    throw error;
  }
};

const matriculasService = {
  getMatriculas,
  getMatricula,
  getMatriculaEst,
  createMatricula,
  updateMatricula,
  deleteMatricula,
};

export default matriculasService;