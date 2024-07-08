import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/asistencias";

const getAsistencias = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las asistencias: ", error);
    throw error;
  }
};

const getAsistenciaId = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la asistencia: ", error);
    throw error;
  }
}

const getAsistencia = async (fecha, horaInicio, horaFin) => {
  try {
    const response = await axios.get(url, {
      params: {
        Fecha: fecha,
        HoraInicio: horaInicio,
        HoraFin: horaFin
      }
    });
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

const createAsistencia = async (asistencia) => {
  try {
    const response = await axios.post(url, asistencia, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la asistencia: ", error);
    throw error;
  }
};

const updateAsistencia = async (id, asistencia) => {
  try {
    const response = await axios.put(`${url}/${id}`, asistencia, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la asistencia: ", error);
    throw error;
  }
};

const deleteAsistencia = async (estudianteId) => {
  try {
    console.log("Se intenta eliminar la asistencia del estudiante con id: ", estudianteId);
    const response = await axios.delete(`${url}/${estudianteId}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error al eliminar la asisitencia del estudiante: ", error);
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

const getHorarios = async () => {
  try {
    const response = await axios.get("http://localhost:3001/gestionEscolar/horarios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los horarios: ", error);
    throw error;
  }
}

const asistenciasService = {
  getAsistencias,
  getAsistencia,
  getAsistenciaId,
  getEstudiantes,
  getHorarios,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
};

export default asistenciasService;