import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/horarios";

const getHorarios = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los horarios: ", error);
    throw error;
  }
};

//Obtener todos los horarios y un horario filtrado por día
const getHorarioDia = async (dia) => {
  try {
    const response = await axios.get(`${url}/?dia=${dia}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el horario: ", error);
    throw error;
  }
}

const getHorario = async (idAsig) => { //solo uno
  try {
    const response = await axios.get(`${url}/${idAsig}`);
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

const createHorario = async (horario) => {
  try {
    const response = await axios.post(url, horario, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el horario: ", error);
    throw error;
  }
};

const updateHorario = async (id, horario) => {
  try {
    const response = await axios.put(`${url}/${id}`, horario, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el horario: ", error);
    throw error;
  }
};

const deleteHorario = async (horarioId) => {
  try {
    console.log("Se intenta eliminar el horario con id: ", horarioId)
    await axios.delete(`${url}/${horarioId}`);
  } catch (error) {
    console.error("Error al eliminar el horario: ", error);
    throw error;
  }
};

const horarioService = {
  getHorarios,
  getHorario,
  getHorarioDia,
  createHorario,
  updateHorario,
  deleteHorario,
};

export default horarioService;
