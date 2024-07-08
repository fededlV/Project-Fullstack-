import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/actividadesExtracurriculares";

const getActExtracurriculares = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las actividades extracurriculares: ", error);
        throw error;
    }
}

const getActExtraNombre = async (nombre) => {
    try {
        const response = await axios.get(`${url}?nombre=${nombre}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la actividad extracurricular por nombre: ", error);
        throw error;
    
    }
}

const getActExtracurricular = async (id) => {
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

const createActExtracurricular = async (actExtracurricular) => {
    try {
        const response = await axios.post(url, actExtracurricular, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear la actividad extracurricular: ", error);
        throw error;
    }
}

const updateActExtracurricular = async (id, actividad) => {
    try {
        const response = await axios.put(`${url}/${id}`, actividad, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la actividad extracurricular: ", error);
        throw error;
    }
}

const deleteActExtracurricular = async (id) => {
    try {
        console.log("Se intenta eliminar la actividad extracurricular con id: ", id)
        const response = await axios.delete(`${url}/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error al eliminar la actividad extracurricular: ", error);
        throw error;
    }
}

const actExtracurricularesService = {
    getActExtracurriculares,
    getActExtraNombre,
    getActExtracurricular,
    createActExtracurricular,
    updateActExtracurricular,
    deleteActExtracurricular
}

export default actExtracurricularesService;