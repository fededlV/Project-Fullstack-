import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/materiales";

const getMateriales = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los materiales: ", error);
    throw error;
  }
};
const getDescMaterial = async (materialDesc) => {
  try {
    const response = await axios.get(`${url}?descripcion=${materialDesc}`);
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
}


const getMaterial = async (id) => {
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

const createMaterial = async (material) => {
  try {
    const response = await axios.post(url, material, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el material: ", error);
    throw error;
  }
};

const updateMaterial = async (id, material) => {
  try {
    const response = await axios.put(`${url}/${id}`, material, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el material: ", error);
    throw error;
  }
};

const deleteMaterial = async (idCurso) => {
  try {
    console.log("Se intenta eliminar el material del curso con id: ", idCurso);
    const response = await axios.delete(`${url}/${idCurso}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error al eliminar el material del curso: ", error);
    throw error;
  }
};

const materialesService = {
  getMateriales,
  getDescMaterial,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};

export default materialesService;