import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/cursos";

const getCursos = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los cursos: ", error);
        throw error;
    }
}

const getCurNom = async (nombre) => {
    try {
        const response = await axios.get(`${url}?nombre=${nombre}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el curso: ", error);
        throw error;
    }
}
 
const getCurso = async (id) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el curso: ", error);
        throw error;
    }
}

const createCurso = async (curso) => {
    try {
        const response = await axios.post(url, curso, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el curso: ", error);
        throw error;
    }
}

const updateCurso = async (id, curso) => {
    try {
        const response = await axios.put(`${url}/${id}`, curso, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el curso: ", error);
        throw error;
    }
}

const deleteCurso = async (cursoId) => {
    try {
        console.log("Se intenta eliminar el curso con id: ", cursoId)
        await axios.delete(`${url}/${cursoId}`);
    } catch (error) {
        console.error("Error al eliminar el curso: ", error);
        throw error;
    }
}

const cursosServices = {
    getCursos,
    getCurso,
    getCurNom,
    createCurso,
    updateCurso,
    deleteCurso,
};

export default cursosServices;