import axios from "axios";
const url = "http://localhost:3001/gestionEscolar/asignaturas";

const getAsignaturas = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las asignaturas: ", error);
        throw error;
    }
}

const getAsigNom = async (nombre) => {
    try {
        const response = await axios.get(`${url}?nombre=${nombre}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la asignatura por nombre: ", error);
        throw error;
    }
}

const getAsignatura = async (id) => {
    try {
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la asignatura: ", error);
        throw error;
    }
}

const createAsignatura = async (asignatura) => {
    try {
        const response = await axios.post(url, asignatura, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear la asignatura: ", error);
        throw error;
    }
}

const updateAsignatura = async (asignatura) => {
    try {
        const response = await axios.put(`${url}/${asignatura.Id_Asignatura}`, asignatura, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la asignatura: ", error);
        throw error;
    }
}

const deleteAsignatura = async (asignaturaId) => {
    try {
        console.log("Se intenta eliminar la asignatura con id: ", asignaturaId)
        const response = await axios.delete(`${url}/${asignaturaId}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error al eliminar la asignatura: ", error);
        throw error;
    }
}

const asignaturasServices = {
    getAsignaturas,
    getAsignatura,
    getAsigNom,
    createAsignatura,
    updateAsignatura,
    deleteAsignatura,
}

export default asignaturasServices;